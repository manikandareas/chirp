import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { config } from 'src/config';

@Injectable()
export class RefreshJwtGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}
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

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? []
        return type === "Refresh" ? token : undefined
    }
}