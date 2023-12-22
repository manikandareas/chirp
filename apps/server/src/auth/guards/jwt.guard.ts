import { JwtService } from '@nestjs/jwt';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { config } from 'src/config';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    /**
     * Check if the user is authorized to access the resource.
     *
     * @param {ExecutionContext} context - The execution context of the function.
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is authorized.
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
            throw new UnauthorizedException();
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
