import { CreateCommentDto, UpdateCommentDto } from '@chirp/dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { OwnerCommentGuard } from './guard/owner-comment.guard';
import { ApiResponse } from '~/typings/apiResponse';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    /**
     * Creates comment to the spesified post.
     * Secures this endpoint using JwtGuard for authentication.
     *
     * @method POST
     * @param postId - the id of the post to which the comment is being created
     * @param createCommentDto - the data transfer object containing the comment details
     * @param req - the request object
     * @returns {Promise<{ statusCode: number, data: any }>}
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated
     */
    @UseGuards(JwtGuard)
    @Post()
    async create(
        @Param('postId') postId: string,
        @Body() createCommentDto: CreateCommentDto,
        @Request() req
    ) {
        console.log('User: ', req.user, 'want to create a new comment');
        const createdComment = await this.commentsService.create(
            postId,
            createCommentDto,
            req.user?.id
        );

        return {
            statusCode: 201,
            data: createdComment,
        } satisfies ApiResponse<typeof createdComment>;
    }

    /**
     * Updates comment.
     * Secures this endpoint using JwtGuard for authentication.
     * Only the owner of the post can update it.
     *
     * @method PUT
     * @param postId - the id of the post to which the comment is being updated
     * @param commentId - the id of the comment to be updated
     * @param updateCommentDto - the data transfer object containing the comment details
     * @returns {Promise<{ statusCode: number, data: any }>}
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated
     * @throws {ForbiddenException} - Throws an exception if the user is not the owner of the post
     * @throws {NotFoundException} - Throws an exception if the comment is not found
     */
    @UseGuards(JwtGuard, OwnerCommentGuard)
    @Put(':commentId')
    async update(
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Request() req
    ) {
        console.log('User: ', req.user, 'want to update a comment', commentId);
        const updatedComment = await this.commentsService.update(
            updateCommentDto,
            commentId
        );

        return {
            statusCode: 201,
            data: updatedComment,
        } satisfies ApiResponse<typeof updatedComment>;
    }

    /**
     * Deletes comment with specified comment ID.
     * Secures this endpoint using JwtGuard for authentication.
     * Only the owner of the comment can delete it.
     *
     * @method DELETE
     * @param commentId - the id of the comment to be deleted
     * @returns {Promise<{ statusCode: number, data: any }>}
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated
     * @throws {ForbiddenException} - Throws an exception if the user is not the owner of the comment
     * @throws {NotFoundException} - Throws an exception if the comment is not found
     */
    @UseGuards(JwtGuard, OwnerCommentGuard)
    @Delete(':commentId')
    async delete(@Param('commentId') commentId: string, @Request() req) {
        console.log('User: ', req.user, 'want to delete a comment', commentId);
        const deletedComment = await this.commentsService.delete(commentId);

        return {
            statusCode: 201,
            data: deletedComment,
        } satisfies ApiResponse<typeof deletedComment>;
    }

    /**
     * Get comments by post ID.
     *
     * @param postId - the id of the post
     * @returns data of the comments
     */
    @Get()
    async getByPostId(@Param('postId') postId: string) {
        return await this.commentsService.getByPostIdWithReplies(postId);
    }
}
