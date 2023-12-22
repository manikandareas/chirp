import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    );

    app.setGlobalPrefix('api');
    await app
        .listen(+config.serverPort)
        .then(() =>
            console.log(`server started 🚀 on port ${config.serverPort}`)
        );
}
bootstrap();
