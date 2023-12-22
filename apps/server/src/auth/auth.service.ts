import { LoginDto } from '@chirp/dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';

const EXPIRE_TIME = 1000 * 60 * 60 * 5;

@Injectable()
export class AuthService {
    /**
     * Constructor for the class.
     *
     * @param {UserService} userService - The user service.
     * @param {JwtService} jwtService - The JWT service.
     */
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Logs in a user.
     *
     * @param {LoginDto} loginDto - The login data for the user.
     * @return {Promise<{user: any, backendTokens: {accessToken: string, refreshToken: string, expiresIn: number}}>} - An object containing the user and backend tokens.
     */
    async loginUser(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);

        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '5h',
                    secret: config.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: config.jwtRefreshTokenKey,
                }),
                expiresIn: new Date().setTime(
                    new Date().getTime() + EXPIRE_TIME
                ),
            },
        };
    }

    /**
     * Validates a user based on the provided login credentials.
     *
     * @param {LoginDto} loginDto - The login data transfer object containing the user's email and password.
     * @return {Promise<object>} - Returns a promise that resolves to an object containing the user details (excluding the password) if the credentials are valid.
     * @throws {UnauthorizedException} - Throws an UnauthorizedException if the credentials are invalid.
     */
    async validateUser(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (user && (await compare(loginDto.password, user.password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    /**
     * Refreshes the user's access token and generates a new refresh token.
     *
     * @param {any} user - The user object containing the username and sub properties.
     * @return {object} An object containing the new access token, refresh token, and expiration date.
     */
    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '5h',
                secret: config.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: config.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
}
