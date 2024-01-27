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
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { OptionalJwtGuard } from '~/auth/guards/optional-jwt.guard';
import { ApiResponse } from '~/typings/apiResponse';
import { OwnerPostGuard } from './guard/post-owner.guard';
import { PostsService } from './posts.service';

@Controller()
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
        @Request() req,
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /(jpg|jpeg|png|svg|tiff|webp|gif)$/,
                })
                .addMaxSizeValidator({ maxSize: 1000000 })
                .build({ fileIsRequired: false })
        )
        images: Array<Express.Multer.File>
    ) {
        console.log('User', req.user, 'want to create a new post');
        const post = await this.postsService.create(createPostDto, req, images);
        return {
            statusCode: 201,
            data: post,
        } satisfies ApiResponse<typeof post>;
    }

    /**
     * Retrieves all the posts data.
     * Secures this endpoint using JwtGuard for authentication.
     *
     * @method GET
     * @param {any} req - The user object from the request.
     * @returns {Promise<{ statusCode: number, data: any[] }>} - A response object with HTTP status code and an array of post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the retrieval process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard)
    @Get()
    async getAll(@Request() req) {
        console.log('User: ', req.user, 'want to get all posts');
        const postsData = await this.postsService.findAll(req.user.id);
        return {
            statusCode: 200,
            data: postsData,
        } satisfies ApiResponse<typeof postsData>;
    }

    /**
     * Retrieves post data by its ID.
     * Secures this endpoint using OptionalJwtGuard for authentication.
     * If the user is not authenticated, the isUserLiked field will be false.
     * If the user is authenticated, the isUserLiked field will be true if the user has liked the post.
     *
     * @method GET
     * @param {string} id - The ID of the post to be retrieved.
     * @param {any} req - The user object from the request.
     * @returns {Promise<{ statusCode: number, data: any }>} - A response object with HTTP status code and the post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the retrieval process.
     */
    @UseGuards(OptionalJwtGuard)
    @Get(':id')
    async getOneById(@Param('id') id: string, @Request() req) {
        console.log('User:', req.user, `want to get post: ${id}`);
        // return postDataById with isUserLiked but not likes data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { likes, ...postDataById } = await this.postsService.findOneById(
            id,
            req.user?.id
        );
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
     * @param {any} req - The user object from the request.
     * @returns {Promise<{ statusCode: number, data: any }>} - A response object with HTTP status code and the updated post data.
     * @throws {HttpException} - Throws an exception if an error occurs during the update process.
     * @throws {UnauthorizedException} - Throws an exception if the user is not authenticated.
     */
    @UseGuards(JwtGuard, OwnerPostGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
        @Request() req
    ) {
        console.log('User:', req.user, `want to update post: ${id}`);
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
    @UseGuards(JwtGuard, OwnerPostGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req) {
        console.log('User:', req.user, `want to delete post: ${id}`);
        const deletedPost = await this.postsService.delete(id);
        return {
            statusCode: 200,
            data: deletedPost,
        } satisfies ApiResponse<typeof deletedPost>;
    }
}
