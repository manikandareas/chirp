import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from '~/comments/comments.module';
import { DrizzleModule } from '~/drizzle/drizzle.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [CommentsModule, DrizzleModule, JwtModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
