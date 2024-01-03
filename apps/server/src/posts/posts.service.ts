import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import { Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { AwsService } from 'src/aws/aws.service';
import * as schema from '@chirp/db';

import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly drizzle: DrizzleService,
        private readonly awsService: AwsService
    ) {}
    private readonly db: NeonHttpDatabase<typeof schema> = this.drizzle.getDb();
    /**
     * Creates a new post with the given data and optional images.
     *
     * @param {CreatePostDto} createPostDto - The data for creating the post.
     * @param {Express.Multer.File} images - Optional images to be uploaded with the post.
     * @return {Promise<{ createdPost: any, imageUploaded?: any }>} - A promise that resolves to an object containing the created post and optionally the uploaded image.
     */
    async create(
        createPostDto: CreatePostDto,
        images?: Array<Express.Multer.File>
    ) {
        const createdPost = await this.db
            .insert(schema.posts)
            .values(createPostDto)
            .returning();
        //* if there is an image when posting
        let imageUploaded;
        if (images) {
            for (const image of images) {
                const imageLocation = await this.awsService.uploadToS3(
                    image.originalname,
                    image.buffer
                );
                imageUploaded = await this.db
                    .insert(schema.images)
                    .values({
                        url: imageLocation.Location,
                        postId: createdPost[0].id,
                    })
                    .returning();
            }
        }

        return { createdPost, imageUploaded: imageUploaded ?? undefined };
    }

    /**
     * Retrieves all posts from the database sorted from newest by date updated.
     *
     * @return {Promise<Post[]>} An array of post objects.
     */
    async findAll() {
        const posts = await this.db.query.posts.findMany({
            columns: {
                authorId: false,
            },
            with: {
                images: {
                    columns: {
                        postId: false,
                    },
                },
                author: {
                    columns: {
                        id: true,
                        fullName: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
            orderBy: [desc(schema.posts.updatedAt)],
        });

        return posts;
    }

    /**
     * Finds a post by its ID.
     *
     * @param {string} id - The ID of the post to find.
     * @return {Promise} - A promise that resolves to the post data.
     */
    async findOneById(id: string) {
        const postDataById = await this.db.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
            columns: {
                authorId: false,
            },
            with: {
                images: {
                    columns: {
                        postId: false,
                    },
                },
                author: {
                    columns: {
                        id: true,
                        fullName: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        console.log(postDataById);
        return postDataById;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
