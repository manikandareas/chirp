import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get('ping')
    pong() {
        return {
            message: 'pong',
        };
    }
}
