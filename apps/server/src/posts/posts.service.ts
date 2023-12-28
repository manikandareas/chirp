import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { AwsService } from 'src/aws/aws.service';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '@chirp/db';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class PostsService {
    /**
     * Constructor for the class PostsService.
     *
     * @param {LibSQLDatabase<typeof schema>} db - The injected DrizzleAsyncProvider instance for database access.
     * @param {AwsService} awsService - The AwsService instance for AWS related operations.
     */
    constructor(
        @Inject(DrizzleAsyncProvider) private db: LibSQLDatabase<typeof schema>,
        private readonly awsService: AwsService
    ) {}

    /**
     * Creates a new post with the given data and optional images.
     *
     * @param {CreatePostDto} createPostDto - The data for creating the post.
     * @param {Express.Multer.File} images - Optional images to be uploaded with the post.
     * @return {Promise<{ createdPost: any, imageUploaded?: any }>} - A promise that resolves to an object containing the created post and optionally the uploaded image.
     */
    async create(createPostDto: CreatePostDto, images?: Express.Multer.File) {
        const createdPost = await this.db
            .insert(schema.posts)
            .values(createPostDto)
            .returning();

        //* if there is an image when posting
        let imageUploaded;
        if (images) {
            const image = await this.awsService.uploadToS3(
                images.originalname,
                images.buffer
            );

            imageUploaded = await this.db
                .insert(schema.images)
                .values({
                    url: image.Location,
                    postId: createdPost[0].id,
                })
                .returning();
        }

        return {
            createdPost,
            imageUploaded: imageUploaded ? imageUploaded : undefined,
        };
    }

    /**
     * Retrieves all posts from the database sorted from newest by date created.
     *
     * @return {Promise<Post[]>} An array of post objects.
     */
    async findAll() {
        const posts = await this.db.query.images.findMany({
            with: {
                post: true,
            },
            orderBy: [desc(schema.images.createdAt)],
        });
        return posts;
    }

    findOne(id: number) {
        return `This action returns a #${id} post`;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
