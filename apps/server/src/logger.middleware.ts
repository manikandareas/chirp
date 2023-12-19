import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl:url} = request;
    response.on('close', () => {
      const { statusCode } = response;
      this.logger.log(
        `${method} ~ ${url} ~ ${statusCode} | ${ip}`
      );
    });
    next();
  }
}

