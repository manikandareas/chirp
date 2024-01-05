import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AppLoggerMiddleware } from './logger.middleware';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';

@Module({
    imports: [UserModule, DrizzleModule, AuthModule, PostsModule, AwsModule],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
