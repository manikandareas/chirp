import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * This class is a middleware function that logs information about incoming requests.
 *
 */
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    /**
     * Executes the middleware function  that logs information about incoming requests. It extracts the IP address, HTTP method, and URL from the request object. It also logs the status code of the response and the IP address of the client.
     *
     * @param {Request} request - The incoming request.
     * @param {Response} response - The outgoing response.
     * @param {NextFunction} next - The next middleware function.
     * @return {void} This function does not return a value.
     */
    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl: url } = request;
        response.on('close', () => {
            const { statusCode } = response;
            this.logger.log(`${method} ~ ${url} ~ ${statusCode} | ${ip}`);
        });
        next();
    }
}
