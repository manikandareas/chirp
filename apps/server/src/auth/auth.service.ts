import {  LoginDto } from '@chirp/dto';
import {  Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from "src/drizzle/schema"
import { UserService } from 'src/user/user.service';
import {JwtService} from "@nestjs/jwt"
import { config } from 'src/config';

const EXPIRE_TIME = 1000 * 60 * 60 * 5

@Injectable()
export class AuthService {
    constructor (
        @Inject(DrizzleAsyncProvider) private db:LibSQLDatabase<typeof schema>
        ,private readonly userService: UserService
        ,private readonly jwtService:JwtService
    ){};

    async loginUser (loginDto: LoginDto) {
        const user = await this.validateUser(loginDto)

        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '5h',
                    secret: config.jwtSecretKey
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: config.jwtRefreshTokenKey
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
            },
        }
    }

    async validateUser (loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email)
        if (user && await compare(loginDto.password, user.password)) {
            const {password, ...result} = user
            return result
        }
        throw new UnauthorizedException('Invalid credentials')
    }

    async refreshToken(user:any) {
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '5h',
                secret: config.jwtSecretKey
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: config.jwtRefreshTokenKey
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
        }
    }
}
