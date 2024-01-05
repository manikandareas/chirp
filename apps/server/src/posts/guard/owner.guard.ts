import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private readonly postsService: PostsService) {}

    /**
     * Check if the user is the owner of the post.
     *
     * @param {string} postId - The ID of the post.
     * @param {any} user - The user object.
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the post.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const postId = request.params.id;
        const isOwner = await this.postsService.isOwner(postId, user);
        if (!isOwner) {
            throw new ForbiddenException('You are not the owner of this post');
        }
        return isOwner;
    }
}
