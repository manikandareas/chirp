import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '~/auth/auth.module';
import { AwsModule } from '~/aws/aws.module';
import { CommentsModule } from '~/comments/comments.module';
import { DrizzleModule } from '~/drizzle/drizzle.module';
import { LikesModule } from '../likes/likes.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [
        forwardRef(() => LikesModule),
        AuthModule,
        AwsModule,
        JwtModule,
        CommentsModule,
        DrizzleModule,
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule {}
