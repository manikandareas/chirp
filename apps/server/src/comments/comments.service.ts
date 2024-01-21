import * as schema from '@chirp/db';
import { CreateCommentDto, UpdateCommentDto } from '@chirp/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Injectable()
export class CommentsService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(private readonly drizzle: DrizzleService) {
        this.db = this.drizzle.getDb();
    }

    // property to get author
    private readonly getAuthor = {
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

    /**
     * Asynchronously creates a comment using the provided post ID, comment DTO, and request user ID.
     *
     * @param {string} idPost - the ID of the post for which the comment is being created
     * @param {CreateCommentDto} createCommentDto - the data transfer object containing the comment details
     * @param {any} reqUserId - the ID of the user making the request
     * @return {Promise<any>} a Promise that resolves with the result of the comment creation
     */
    async create(
        postId: string,
        createCommentDto: CreateCommentDto,
        reqUserId: string
    ) {
        await this.db
            .insert(schema.comments)
            .values({
                ...createCommentDto,
                postId,
                authorId: reqUserId,
            })
            .returning();

        return { message: 'Comment created successfully' };
    }

    /**
     * Retrieves comments by post ID where the parent comment is null and replies depth is 3.
     *
     * @param {string} postId - The ID of the post
     * @return {Promise<Comment[]>} The comments associated with the post ID
     */
    async getByPostIdWithReplies(postId?: string) {
        const comments = await this.db.query.comments.findMany({
            orderBy: desc(schema.comments.createdAt),
            where: and(
                eq(schema.comments.postId, postId),
                isNull(schema.comments.parentId)
            ),
            with: {
                author: {
                    ...this.getAuthor.author,
                },
                replies: {
                    with: {
                        ...this.getAuthor,
                        replies: {
                            with: {
                                ...this.getAuthor,
                                replies: {
                                    with: this.getAuthor,
                                },
                            },
                        },
                    },
                },
            },
        });

        return comments;
    }

    /**
     * Updates a comment with the given postId and commentId.
     *
     * @param {string} postId - The id of the post related to the comment.
     * @param {UpdateCommentDto} updateCommentDto - The data to update the comment.
     * @param {unknown} commentId - The id of the comment to be updated.
     * @return {Object} An object with a message indicating the update success.
     */
    async update(updateCommentDto: UpdateCommentDto, commentId) {
        await this.db
            .update(schema.comments)
            .set({
                message: updateCommentDto.message,
                updatedAt: new Date(),
            })
            .where(eq(schema.comments.id, commentId))
            .returning();

        return { message: 'Comment updated successfully' };
    }

    /**
     * Asynchronously deletes a specified comment.
     *
     * @param {string} commentId - the ID of the comment to be deleted
     * @return {object} an object with a message indicating successful deletion
     */
    async delete(commentId: string) {
        await this.db
            .delete(schema.comments)
            .where(eq(schema.comments.id, commentId));

        return { message: 'Comment deleted successfully' };
    }

    /**
     * Asynchronously checks if the comment ID is valid and exists.
     *
     * @param {string} commentId - the comment ID to validate
     * @return {boolean} true if the comment ID is valid
     * @throws {NotFoundException} if the comment ID is invalid
     */
    async validateCommentId(commentId: string) {
        const checkCommentId = await this.db.query.comments.findFirst({
            where: and(eq(schema.comments.id, commentId)),
        });

        if (!checkCommentId) {
            throw new NotFoundException('Comment not found');
        }

        return true;
    }

    /**
     * Asynchronously checks if the user is the owner of the specified comment.
     *
     * @param {string} id - The ID of the comment to check ownership for
     * @param {type} user - The user object to check ownership against
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating
     * whether the user is the owner of the specified comment
     */
    async isOwnerComment(id: string, user): Promise<boolean> {
        await this.validateCommentId(id);

        const requestedPostId = await this.db.query.comments.findFirst({
            where: and(eq(schema.comments.id, id)),
            columns: {
                authorId: true,
            },
        });
        console.log(requestedPostId);
        return requestedPostId.authorId === user.id;
    }
}
