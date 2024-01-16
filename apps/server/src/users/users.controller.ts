import { UpdateUserDto } from '@chirp/dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { OptionalJwtGuard } from '~/auth/guards/optional-jwt.guard';
import { ApiResponse } from '~/typings/apiResponse';
import { ProfileOwnerGuard } from './guard/profile-owner.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Retrieves the user profile based on the provided username.
     * Secures this endpoint using OptionalJwtGuard for authentication.
     * If the `posts` query parameter is set to `true`, the user's posts will be included in the response.
     * If the `posts` query parameter is not set or set to `false`, the user's profile data will be returned.
     *
     * @method GET
     * @param {string} username - The username of the user.
     * @param {boolean} posts - Whether to include the user's posts in the response.
     * @param {Request} req - The user object from the request.
     * @return {ApiResponse<typeof user>} The response object containing the user profile data.
     */
    @UseGuards(OptionalJwtGuard)
    @Get(':username')
    async getUserProfile(
        @Param('username') username: string,
        @Query('posts') posts: boolean,
        @Request() req
    ) {
        console.log('User:', req.user, `want to get profile: ${username}`);
        if (posts) {
            const userWithPosts =
                await this.usersService.findByUsernameWithPosts(
                    username,
                    req.user?.id
                );
            return {
                statusCode: HttpStatus.OK,
                data: userWithPosts,
            } satisfies ApiResponse<typeof userWithPosts>;
        }
        const user = await this.usersService.findByUsername(username);
        return {
            statusCode: HttpStatus.OK,
            data: user,
        } satisfies ApiResponse<typeof user>;
    }

    /**
     * Updates a user's profile.
     * Secures this endpoint using JwtGuard and ProfileOwnerGuard for authentication.
     * If the user is not the owner of the profile, an 403 Forbidden will be thrown.
     *
     * @method PUT
     * @param {string} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - The data to update the user with.
     * @param {Request} req - The user object from the request.
     * @return {ApiResponse<typeof updatedUser>} - The updated user data.
     */
    @UseGuards(JwtGuard, ProfileOwnerGuard)
    @Put(':id')
    async updateUserProfile(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Request() req
    ) {
        console.log('User:', req.user, `want to update profile: ${id}`);
        const updatedUser = await this.usersService.updateUser(
            id,
            updateUserDto
        );
        return {
            statusCode: HttpStatus.OK,
            data: updatedUser,
        } satisfies ApiResponse<typeof updatedUser>;
    }

    /**
   * Delete a user's profile.
   * Secures this endpoint using JwtGuard and ProfileOwnerGuard for authentication.
   * If the user is not the owner of the profile, an 403 Forbidden will be thrown.
   *
   * @method DELETE
   * @param {string} id - The unique identifier (ID) of the user whose profile will be deleted.
   * @param {Request} req - The user object from the request.
   * @return {ApiResponse<void>} - A successful response returns no content with an HTTP status code
   of 204.
   */
    @Delete(':id')
    @UseGuards(JwtGuard, ProfileOwnerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUserProfile(@Param('id') id: string, @Request() req) {
        console.log('User:', req.user, `want to delete profile: ${id}`);
        return await this.usersService.deleteUser(id);
    }
}
