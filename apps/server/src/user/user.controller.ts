import { Controller, Get, Param, HttpStatus, UseGuards, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from 'src/typings/apiResponse';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from '@chirp/dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
    @Get(":id")
    async getUserProfile(@Param("id") id:string ){
      const user = await this.userService.findById(id)
      return {
        statusCode: HttpStatus.OK,
        data: user
      } satisfies ApiResponse<typeof user>
    }

    @Put(":id")
    async updateUserProfile(@Param("id") id:string, @Body() updateUserDto: UpdateUserDto){
      const updatedUser = await this.userService.updateUser(id, updateUserDto)
      return {
        statusCode: HttpStatus.OK,
        data: updatedUser
      } satisfies ApiResponse<typeof updatedUser>
    }
}

