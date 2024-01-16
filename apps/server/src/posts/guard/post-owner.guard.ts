import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class OwnerPostGuard implements CanActivate {
    constructor(private readonly postsService: PostsService) {}

    /**
     * Check if the user is the owner of the post.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the post.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requestingUserid = request.user;
        const requestedPostId = request.params.id;
        const isOwnerPost = await this.postsService.isOwnerPost(
            requestedPostId,
            requestingUserid
        );
        if (!isOwnerPost) {
            throw new ForbiddenException('You are not the owner of this post!');
        }
        return isOwnerPost;
    }
}
