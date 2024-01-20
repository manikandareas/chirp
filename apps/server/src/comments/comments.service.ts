import * as schema from '@chirp/db';
import { CreateCommentDto, UpdateCommentDto } from '@chirp/dto';
import { Injectable } from '@nestjs/common';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Injectable()
export class CommentsService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(private readonly drizzle: DrizzleService) {
        this.db = this.drizzle.getDb();
    }

    /**
     * Asynchronously creates a comment using the provided post ID, comment DTO, and request user ID.
     *
     * @param {string} idPost - the ID of the post for which the comment is being created
     * @param {CreateCommentDto} createCommentDto - the data transfer object containing the comment details
     * @param {any} reqUserId - the ID of the user making the request
     * @return {Promise<any>} a Promise that resolves with the result of the comment creation
     */
    async createComment(
        idPost: string,
        createCommentDto: CreateCommentDto,
        reqUserId: any
    ) {
        return await this.db
            .insert(schema.comments)
            .values({
                ...createCommentDto,
                postId: idPost,
                authorId: reqUserId,
            })
            .returning();
    }

    async update(
        postId: string,
        updateCommentDto: UpdateCommentDto,
        commentId
    ) {
        return 'bro';
    }

    /**
     * Retrieves comments by post ID where the parent comment is null.
     *
     * @param {string} postId - The ID of the post
     * @return {Promise<Comment[]>} The comments associated with the post ID
     */
    async getCommentsByPostIdWithReplies(postId: string) {
        const authorRepliesAndAuthorParent = {
            author: {
                columns: {
                    id: true,
                    username: true,
                    fullName: true,
                    avatarUrl: true,
                },
            },
            parent: {
                columns: {},
                with: {
                    author: {
                        columns: {
                            username: true,
                        },
                    },
                },
            },
        };

        const comments = await this.db.query.comments.findMany({
            orderBy: desc(schema.comments.createdAt),
            where: and(
                eq(schema.comments.postId, postId),
                isNull(schema.comments.parentId``)
            ),
            with: {
                replies: {
                    with: {
                        ...authorRepliesAndAuthorParent,
                        replies: {
                            with: {
                                ...authorRepliesAndAuthorParent,
                                replies: {
                                    with: authorRepliesAndAuthorParent,
                                },
                            },
                        },
                    },
                },
            },
        });

        return comments;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }

    async isOwnerComment(id: string, user): Promise<boolean> {
        const requestedPostId = await this.db.query.comments.findFirst({
            where: and(
                eq(schema.comments.id, id),
                eq(schema.comments.authorId, user.id)
            ),
            columns: {
                authorId: true,
            },
        });
        console.log(requestedPostId);
        return requestedPostId.authorId === user.id;
    }
}
