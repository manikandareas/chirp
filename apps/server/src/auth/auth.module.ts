import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '~/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '~/drizzle/drizzle.service';

@Module({
    providers: [AuthService, DrizzleService, UserService, JwtService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
