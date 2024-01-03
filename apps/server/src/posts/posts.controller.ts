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
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/typings/apiResponse';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    /**
     * Creates a new post with the given data and images.
     *
     * @param {CreatePostDto} createPostDto - The data for creating the post.
     * @param {Express.Multer.File} images - The images to be uploaded (optional).
     * @return {Promise<{ statusCode: number, data: any }>} - The response object containing the status code and data.
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
        images: Array<Express.Multer.File>
    ) {
        const post = await this.postsService.create(createPostDto, images);
        return {
            statusCode: 201,
            data: post,
        } satisfies ApiResponse<typeof post>;
    }

    /**
     * Retrieves all the data.
     *
     * @return {Promise<{ statusCode: number, data: any }>} The response object containing the status code and data.
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
     * Find one by ID.
     *
     * @param {string} id - The ID of the item to find.
     * @return {ApiResponse<typeof postData>} - The response object containing the status code and data.
     */
    @Get(':id')
    async findOneById(@Param('id') id: string) {
        const postData = await this.postsService.findOneById(id);
        return {
            statusCode: 200,
            data: postData,
        } satisfies ApiResponse<typeof postData>;
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':key')
    remove(@Param('key') key: string) {
        return this.postsService.remove(key);
    }
}
