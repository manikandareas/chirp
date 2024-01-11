import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '~/auth/auth.module';
import { AwsModule } from '~/aws/aws.module';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LikesModule } from '../likes/likes.module';
import { LikesService } from '../likes/likes.service';

@Module({
    imports: [AuthModule, AwsModule, JwtModule, forwardRef(() => LikesModule)],
    controllers: [PostsController],
    providers: [PostsService, DrizzleService, LikesService],
    exports: [PostsService],
})
export class PostsModule {}
