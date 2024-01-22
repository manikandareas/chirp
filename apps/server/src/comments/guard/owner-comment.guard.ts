import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { CommentsService } from '../comments.service';

@Injectable()
export class OwnerCommentGuard implements CanActivate {
    constructor(private readonly commentsService: CommentsService) {}

    /**
     * Check if the user is the owner of the post.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the post.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requestingUserid = request.user;
        // const requestedPostId = request.params.postId;
        const requestedCommentId = request.params.commentId;

        // console.log(requestedPostId, requestedCommentId);
        const isOwnerComment = await this.commentsService.isOwnerComment(
            requestedCommentId,
            requestingUserid
        );
        if (!isOwnerComment) {
            throw new ForbiddenException(
                'You are not the owner of this comment!'
            );
        }
        return isOwnerComment;
    }
}
