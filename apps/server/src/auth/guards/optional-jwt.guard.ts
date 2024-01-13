import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { config } from '~/config';

@Injectable()
export class OptionalJwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    /**
     * Checks if the user is authorized.
     * If the user is authorized, return true.
     * If the user is not authorized, return true.
     *
     * @param {ExecutionContext} context - The execution context.
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the user is authorized.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const token = this.extractTokenFromHeader(request);
            const payload = await this.jwtService.verifyAsync(token, {
                secret: config.jwtSecretKey,
            });

            request['user'] = payload;
        } catch (error) {
            return true;
        }

        return true;
    }

    /**
     * Extracts the token from the authorization header of a request.
     *
     * @param {Request} request - The request object.
     * @returns {string | undefined} - The extracted token or undefined if not found.
     */
    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
