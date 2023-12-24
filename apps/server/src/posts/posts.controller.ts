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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/typings/apiResponse';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('images'))
    async create(
        @Body() createPostDto: CreatePostDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
                .addMaxSizeValidator({ maxSize: 1000000 })
                .build({ fileIsRequired: false })
        )
        images: Express.Multer.File
    ) {
        const post = await this.postsService.create(createPostDto, images);
        return {
            statusCode: 201,
            data: post,
        } satisfies ApiResponse<typeof post>;
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
