import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse } from '~/typings/apiResponse';
import { LikesService } from './likes.service';
import { JwtGuard } from '~/auth/guards/jwt.guard';

@Controller()
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    /**
     * Like a post with the given post ID and user ID.
     * Secures this endpoint using JwtGuard for authentication.
     *
     * @method POST
     * @param {string} postId - The ID of the post to like.
     * @param {Request} req - The request object.
     * @return {Promise<ApiResponse<typeof like>>} - The response object containing the status code and data.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard)
    @Post(':postId')
    async likePost(@Param('postId') postId: string, @Request() req) {
        const like = await this.likesService.likePost(postId, req.user.id);
        return {
            statusCode: 201,
            data: like,
        } satisfies ApiResponse<typeof like>;
    }
}
