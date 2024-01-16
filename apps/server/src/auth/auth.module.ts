import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '~/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Module({
    providers: [AuthService, DrizzleService, UsersService, JwtService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
