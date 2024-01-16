import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, DrizzleService, JwtService],
})
export class UsersModule {}
