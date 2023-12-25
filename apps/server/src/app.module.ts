import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AppLoggerMiddleware } from './logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';

@Module({
    imports: [UserModule, DrizzleModule, AuthModule, PostsModule],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
