import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }), UserModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
