import { CreateLikeDto } from '@chirp/dto';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiResponse } from '~/typings/apiResponse';
import { LikesService } from './likes.service';

@Controller()
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Post(':postId')
    async likePost(
        @Param('postId') postId: string,
        @Body() likeDto: CreateLikeDto
    ) {
        const like = await this.likesService.likePost(postId, likeDto);
        return {
            statusCode: 201,
            data: like,
        } satisfies ApiResponse<typeof like>;
    }
}
