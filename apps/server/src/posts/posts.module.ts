import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '~/auth/auth.module';
import { AwsModule } from '~/aws/aws.module';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LikesModule } from '../likes/likes.module';

@Module({
    imports: [forwardRef(() => LikesModule), AuthModule, AwsModule, JwtModule],
    controllers: [PostsController],
    providers: [PostsService, DrizzleService],
    exports: [PostsService],
})
export class PostsModule {}
