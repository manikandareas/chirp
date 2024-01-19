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

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createComment(
        @Param('postId') postId: string,
        @Body() createCommentDto: CreateCommentDto,
        @Request() req
    ) {
        console.log('User: ', req.user, 'want to create a new comment');
        return await this.commentsService.createComment(
            postId,
            createCommentDto,
            req.user?.id
        );
    }

    @UseGuards(JwtGuard, OwnerCommentGuard)
    @Put(':commentId')
    async update(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Request() req
    ) {
        return await this.commentsService.update(
            postId,
            updateCommentDto,
            commentId
        );
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }

    @Get()
    async getComments(@Param('postId') postId: string) {
        console.log(postId);
        return await this.commentsService.getCommentsByPostIdWhereParentComment(
            postId
        );
    }

    // @Get()
    // async getRepliesComments(, @Param('commentId') commentId: string) {

    // }
}
