import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AppLoggerMiddleware } from './logger.middleware';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import { RouterModule } from '@nestjs/core';
import { postsAndLikesRoutes } from './routes/posts-likes.routes';
import { CommentsModule } from './comments/comments.module';
import { postsAndCommentsRoutes } from './routes/posts-comments.route';

@Module({
    imports: [
        RouterModule.register(postsAndLikesRoutes),
        RouterModule.register(postsAndCommentsRoutes),
        UsersModule,
        DrizzleModule,
        AuthModule,
        PostsModule,
        AwsModule,
        LikesModule,
        CommentsModule,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
