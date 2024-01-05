import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseFilePipeBuilder,
    Patch,
    Post,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/typings/apiResponse';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from './guard/owner.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    /**
     * Creates a new post with the given data and images.
     * Secures this endpoint using JwtGuard for authentication.
     *
     * @method POST
     * @param {CreatePostDto} createPostDto - The data for creating the post.
     * @param {any} user - The user creating the post.
     * @param {Express.Multer.File[]} images - An array of uploaded image files. (optional).
     * @return {Promise<{ statusCode: number, data: any }>} - The response object containing the status code and data.
     * @throws {HttpException} - Throws an exception if an error occurs during the creation process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async create(
        @Body() createPostDto: CreatePostDto,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
                .addMaxSizeValidator({ maxSize: 1000000 })
                .build({ fileIsRequired: false })
        )
        images: Array<Express.Multer.File>,
        @Request() req
    ) {
        const post = await this.postsService.create(
            createPostDto,
            req.user,
            images
        );
        return {
            statusCode: 201,
            data: post,
        } satisfies ApiResponse<typeof post>;
    }

    /**
     * Retrieves all the data.
     * Secures this endpoint using JwtGuard for authentication.
     *
     * @method GET
     * @returns {Promise<{ statusCode: number, data: any[] }>} - A response object with HTTP status code and an array of post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the retrieval process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard)
    @Get()
    async findAll() {
        const postsData = await this.postsService.findAll();

        return {
            statusCode: 200,
            data: postsData,
        } satisfies ApiResponse<typeof postsData>;
    }

    /**
     * Retrieves post data by its ID.
     *
     * @method GET
     * @param {string} id - The ID of the post to be retrieved.
     * @returns {Promise<{ statusCode: number, data: any }>} - A response object with HTTP status code and the post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the retrieval process.
     */
    @Get(':id')
    async findOneById(@Param('id') id: string) {
        const postDataById = await this.postsService.findOneById(id);
        return {
            statusCode: 200,
            data: postDataById,
        } satisfies ApiResponse<typeof postDataById>;
    }

    /**
     * Updates a post with the given ID using the provided data.
     * Secures this endpoint using JwtGuard for authentication.
     * Only the owner of the post can update it.
     *
     * @method PATCH
     * @param {string} id - The ID of the post to be updated.
     * @param {UpdatePostDto} updatePostDto - A Data Transfer Object (DTO) containing the update information for the post.
     * @returns {Promise<{ statusCode: number, data: any }>} - A response object with HTTP status code and the updated post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the update process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard, OwnerGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto
    ) {
        const updatedPost = await this.postsService.update(id, updatePostDto);
        return {
            statusCode: 200,
            data: updatedPost,
        } satisfies ApiResponse<typeof updatedPost>;
    }

    /**
     * Removes a post with the given ID.
     * Secures this endpoint using JwtGuard for authentication.
     * Only the owner of the post can delete it.
     *
     * @method DELETE
     * @param {string} id - The ID of the post to be removed.
     * @return {Promise<{statusCode: number, data: any}>} - A promise that resolves to an object containing the status code and the data of the deleted post.
     * @throws {HttpException} - Throws an exception if an error occurs during the removal process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard, OwnerGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const deletedPost = await this.postsService.remove(id);
        return {
            statusCode: 200,
            data: deletedPost,
        } satisfies ApiResponse<typeof deletedPost>;
    }
}
