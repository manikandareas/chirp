import {
    Controller,
    Get,
    Param,
    HttpStatus,
    UseGuards,
    Put,
    Body,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '~/typings/apiResponse';
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { UpdateUserDto } from '@chirp/dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    /**
     * Retrieves the user profile based on the provided ID.
     *
     * @param {string} id - The ID of the user.
     * @return {ApiResponse<typeof user>} The response object containing the user profile data.
     */
    async getUserProfile(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        return {
            statusCode: HttpStatus.OK,
            data: user,
        } satisfies ApiResponse<typeof user>;
    }

    @Put(':id')
    /**
     * Updates a user's profile.
     *
     * @param {string} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - The data to update the user with.
     * @return {ApiResponse<typeof updatedUser>} - The updated user data.
     */
    async updateUserProfile(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        const updatedUser = await this.userService.updateUser(
            id,
            updateUserDto
        );
        return {
            statusCode: HttpStatus.OK,
            data: updatedUser,
        } satisfies ApiResponse<typeof updatedUser>;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    /**
   * Delete a user's profile.
   *
   * @param {string} id - The unique identifier (ID) of the user whose profile will be deleted.
   * @return {ApiResponse<void>} - A successful response returns no content with an HTTP status code
   of 204.
   */
    async deleteUserProfile(@Param('id') id: string) {
        return await this.userService.deleteUser(id);
    }
}
