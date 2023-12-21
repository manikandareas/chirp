import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto ,UpdateUserDto} from '@chirp/dto';
import { ApiResponse } from 'src/typings/apiResponse';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
      }satisfies ApiResponse<typeof user>
    }

  }

