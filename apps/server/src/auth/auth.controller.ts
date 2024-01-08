import { CreateUserDto, LoginDto } from '@chirp/dto';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '~/typings/apiResponse';
import { UserService } from '~/user/user.service';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('register')
    /**
+     * Registers a new user.
+     *
+     * @param {CreateUserDto} createUserDto - The data of the user to be created.
+     * @return {Promise<ApiResponse<typeof user>>} The response object containing the status code and data of the created user.
+     */
    async registerUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.registerUser(createUserDto);
        return {
            statusCode: HttpStatus.CREATED,
            data: user,
        } satisfies ApiResponse<typeof user>;
    }

    @Get('checkAvailability')
    /**
     * Checks the availability of a username and email.
     *
     * @param {string} username - The username to check availability for.
     * @param {string} email - The email to check availability for.
     * @return {Promise<ApiResponse<typeof user>>} - The availability check result.
     */
    async checkAvailability(
        @Query('username') username: string,
        @Query('email') email: string
    ) {
        const user = await this.userService.checkAvailability(username, email);
        return {
            statusCode: HttpStatus.OK,
            data: user,
        } satisfies ApiResponse<typeof user>;
    }

    @Post('login')
    /**
     * Logs in a user.
     *
     * @param {LoginDto} loginDto - the login data for the user
     * @return {Promise<any>} - a promise that resolves to the result of the login operation
     */
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.loginUser(loginDto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req.user);
    }
}
