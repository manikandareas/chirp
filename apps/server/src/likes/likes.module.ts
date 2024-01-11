import { Module, forwardRef } from '@nestjs/common';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { LikesService } from './likes.service';
import { PostsModule } from '../posts/posts.module';
import { LikesController } from './likes.controller';

@Module({
    imports: [forwardRef(() => PostsModule)],
    controllers: [LikesController],
    providers: [LikesService, DrizzleService],
})
export class LikesModule {}
