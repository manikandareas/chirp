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
     * Check if the user is the owner of the comment.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the comment.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requestingUserid = request.user;
        const requestedCommentId = request.params.commentId;

        console.log(requestedCommentId, requestingUserid);
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
