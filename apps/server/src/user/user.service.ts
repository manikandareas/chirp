import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../drizzle/schema"
import { CreateUserDto, UpdateUserDto } from '@chirp/dto';

@Injectable()
export class UserService {
  constructor (@Inject(DrizzleAsyncProvider) private db:LibSQLDatabase<typeof schema>){};
  async create(createUserDto: CreateUserDto) {
    const user = await this.db.insert(schema.users).values(createUserDto).returning()
    return user;
  }

  async findAll() {
    const users = await this.db.select().from(schema.users).all()
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
