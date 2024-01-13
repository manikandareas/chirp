import { Module, forwardRef } from '@nestjs/common';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { LikesService } from './likes.service';
import { PostsModule } from '../posts/posts.module';
import { LikesController } from './likes.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [forwardRef(() => PostsModule), JwtModule],
    controllers: [LikesController],
    providers: [LikesService, DrizzleService],
    exports: [LikesService],
})
export class LikesModule {}
