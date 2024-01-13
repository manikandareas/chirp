import * as schema from '@chirp/db';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(
        private readonly drizzle: DrizzleService,
        @Inject(forwardRef(() => PostsService))
        private readonly postsService: PostsService
    ) {
        this.db = this.drizzle.getDb();
    }

    /**
     * Like a post with the given post ID and user ID.
     * If the user has not liked the post, it will be liked.
     * If the user already liked the post, it will be unliked.
     *
     * @param {string} postId - The ID of the post to like.
     * @param {any} user - The user object.
     * @return {Promise<object>} An object with a message indicating whether the post was liked or unliked.
     */
    async likePost(postId: string, user) {
        const userId = user.id;
        await this.postsService.findOneById(postId, userId);

        // check if user already liked this post & get total likes
        const [existingLike, getTotalLikes] = await Promise.all([
            this.findLikeByUserAndPost(postId, userId),
            this.getTotalLikes(postId),
        ]);

        if (existingLike) {
            console.log('User: ', user, `want to dislike post: ${postId}`);
            await this.db
                .delete(schema.likes)
                .where(
                    and(
                        eq(schema.likes.userId, userId),
                        eq(schema.likes.postId, postId)
                    )
                );

            await this.db
                .update(schema.posts)
                .set({ totalLikes: getTotalLikes - 1 })
                .where(eq(schema.posts.id, postId))
                .returning({ totalLike: schema.posts.totalLikes });
            return {
                message: 'Unliked Post!',
            };
        }

        console.log('User: ', user, `want to like post: ${postId}`);
        await this.db
            .insert(schema.likes)
            .values({
                userId: userId,
                postId,
            })
            .returning();

        await this.db
            .update(schema.posts)
            .set({ totalLikes: getTotalLikes + 1 })
            .where(eq(schema.posts.id, postId))
            .returning({ totalLike: schema.posts.totalLikes });

        return {
            message: 'Liked Post!',
        };
    }

    /**
     * Finds a like data by user and post.
     *
     * @param {string} postId - The ID of the post.
     * @param {string} userId - The ID of the user.
     * @return {Promise<type>} The existing like, if found.
     */
    async findLikeByUserAndPost(postId: string, userId: string) {
        const existingLike = await this.db.query.likes.findFirst({
            where: (likes, { and, eq }) =>
                and(eq(likes.postId, postId), eq(likes.userId, userId)),
        });
        return existingLike;
    }

    /**
     * Retrieves the total number of likes for a specific post.
     *
     * @param {string} postId - The ID of the post.
     * @return {Promise<number>} The total number of likes for the post.
     */
    async getTotalLikes(postId: string) {
        return await this.db.query.posts
            .findFirst({
                where: eq(schema.posts.id, postId),
                columns: {
                    totalLikes: true,
                },
            })
            .then((res) => res.totalLikes);
    }
}
