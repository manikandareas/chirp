import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { config } from 'src/config';

@Injectable()
export class RefreshJwtGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}
    /**
     * Checks if the user can activate the given context.
     *
     * @param {ExecutionContext} context - The execution context.
     * @return {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user can activate the context.
     */
    async canActivate(context: ExecutionContext):  Promise<boolean>
    {
        const request = context.switchToHttp().getRequest()
        try {
            const token = this.extractTokenFromHeader(request)
            const payload = await this.jwtService.verifyAsync(token, {
                secret: config.jwtRefreshTokenKey
            })

            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true
    }

    /**
     * Extracts a token from the authorization header of a request.
     *
     * @param {Request} request - The request object.
     * @return {string|undefined} The extracted token or undefined if not found.
     */
    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? []
        return type === "Refresh" ? token : undefined
    }
}