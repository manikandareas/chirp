import { PostsService } from '../posts.service';
import { OwnerGuard } from '../../auth/guards/owner.guard';

describe('OwnerGuard', () => {
    let postsService: PostsService;
    it('should be defined', () => {
        expect(new OwnerGuard(postsService)).toBeDefined();
    });
});
