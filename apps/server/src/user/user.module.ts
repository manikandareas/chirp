import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, ...drizzleProvider],

})
export class UserModule {}
