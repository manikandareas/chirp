import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
// import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AwsModule } from 'src/aws/aws.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
    imports: [AuthModule, AwsModule, JwtModule],
    controllers: [PostsController],
    providers: [PostsService, DrizzleService],
})
export class PostsModule {}
