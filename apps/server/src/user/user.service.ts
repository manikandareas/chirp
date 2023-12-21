import { ConflictException, Inject, Injectable ,NotFoundException,BadRequestException} from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../drizzle/schema"
import { CreateUserDto, UpdateUserDto } from '@chirp/dto';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { combinerName, nullishObjectChecker } from 'src/lib/utils';

@Injectable()
export class UserService {
  constructor (@Inject(DrizzleAsyncProvider) private db:LibSQLDatabase<typeof schema>){};
  async registerUser (createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email)
  
      if(user) throw new ConflictException('email duplicated')

      const name = combinerName(user, createUserDto.firstName, createUserDto.lastName)
    
      const createdUsers = await this.db
      .insert(schema.users)
      .values({
        ...createUserDto,
        name,
        password: await hash(createUserDto.password, 10)
      })
      .returning()
  
      const {password: _, ...createdUser} = createdUsers[0]
  
      return createdUser
  }

  async findByEmail (email: string) {
   return await this.db.query.users.findFirst({
      where: ( user, {eq}) => eq(user.email, email) ,
    })
  }

  async findById (id: string) {
    return await this.db.query.users.findFirst({
       where: ( user, {eq}) => eq(user.id, id) 
     })
   }

  async updateUser (id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id)

    if (!user) throw new NotFoundException()
    if (!nullishObjectChecker(updateUserDto)) throw new BadRequestException()

    const name = combinerName(user,updateUserDto.firstName, updateUserDto.lastName)

    console.log({updateUserDto})
   const updatedUsers = await this.db.update(schema.users)
   .set({
    ...user,
    ...updateUserDto,
    name: name ? name : user.name,
   })
   .where(eq(schema.users.id, id))
   .returning()
   
    const {password: _, ...updatedUser} = updatedUsers[0]
    return updatedUser
  }
}
