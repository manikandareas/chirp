import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../drizzle/schema"
import { CreateUserDto, UpdateUserDto } from '@chirp/dto';
import { config } from 'src/config';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor (@Inject(DrizzleAsyncProvider) private db:LibSQLDatabase<typeof schema>){};
  async registerUser (createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email)
  
      if(user) throw new ConflictException('email duplicated')
  
      const createdUsers = await this.db
      .insert(schema.user)
      .values({...createUserDto, password: await hash(createUserDto.password, 10)})
      .returning()
  
      const {password: _, ...createdUser} = createdUsers[0]
  
      return createdUser
  }

  async findByEmail (email: string) {
   return await this.db.query.user.findFirst({
      where: ( user, {eq}) => eq(user.email, email) 
    })
  }

  async findById (id: string) {
    return await this.db.query.user.findFirst({
       where: ( user, {eq}) => eq(user.id, id) 
     })
   }
}
