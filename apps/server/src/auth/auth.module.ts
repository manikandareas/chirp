import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { UserService } from 'src/user/user.service';
import {JwtService} from "@nestjs/jwt"

@Module({
  providers: [AuthService, ...drizzleProvider, UserService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
