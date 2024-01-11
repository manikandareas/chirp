import * as schema from '@chirp/db';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(
        private readonly drizzle: DrizzleService,
        private readonly postsService: PostsService
    ) {
        this.db = this.drizzle.getDb();
    }

    /**
     * Like a post.
     *
     * @param {string} postId - The ID of the post to like.
     * @param {CreateLikeDto} likeDto - The like data object.
     * @return {Promise<object>} An object with a message indicating whether the post was liked or unliked.
     */
    async likePost(postId: string, userId) {
        await this.postsService.findOneById(postId);

        // check if user already liked this post & get total likes
        const [existingLike, getTotalLikes] = await Promise.all([
            this.findLikeByUserAndPost(postId, userId),
            this.getTotalLikes(postId),
        ]);

        if (existingLike) {
            await this.db
                .delete(schema.likes)
                .where(eq(schema.likes.userId, userId));

            await this.db
                .update(schema.posts)
                .set({ totalLikes: getTotalLikes - 1 })
                .where(eq(schema.posts.id, postId))
                .returning({ totalLike: schema.posts.totalLikes });
            return {
                message: 'Unliked Post!',
            };
        }

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
            where: (likes, { eq }) =>
                eq(likes.postId, postId) && eq(likes.userId, userId),
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
