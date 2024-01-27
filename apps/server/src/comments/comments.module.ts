import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [CommentsController],
    providers: [CommentsService, DrizzleService],
    exports: [CommentsService],
})
export class CommentsModule {}
