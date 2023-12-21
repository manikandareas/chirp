import { LoginDto } from '@chirp/dto';
import { ApiResponse } from 'src/typings/apiResponse';
import { CreateUserDto } from '@chirp/dto';
import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from './guards/refresh.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService:UserService) {}

    @Post('register')

    /**
+     * Registers a new user.
+     *
+     * @param {CreateUserDto} createUserDto - The data of the user to be created.
+     * @return {Promise<ApiResponse<typeof user>>} The response object containing the status code and data of the created user.
+     */

    async registerUser (@Body() createUserDto:CreateUserDto ){
       const user = await this.userService.registerUser(createUserDto)
       return {
           statusCode: HttpStatus.CREATED,
           data: user
       }satisfies ApiResponse<typeof user>
    }

    @Post('login')

    /**
     * Logs in a user.
     *
     * @param {LoginDto} loginDto - the login data for the user
     * @return {Promise<any>} - a promise that resolves to the result of the login operation
    */

    async login (@Body() loginDto:LoginDto){
        return await this.authService.loginUser(loginDto)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
}
