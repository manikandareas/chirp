import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Module({
    controllers: [UserController],
    providers: [UserService, DrizzleService, JwtService],
})
export class UserModule {}
