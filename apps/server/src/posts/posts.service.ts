import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { config } from 'src/config';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';

@Injectable()
export class PostsService {
    private readonly s3Client = new S3Client({
        region: config.awsS3Region,
        credentials: {
            accessKeyId: config.awsAccessKeyId,
            secretAccessKey: config.awsSecretAccessKey,
        },
    });
    constructor(
        @Inject(DrizzleAsyncProvider) private db: LibSQLDatabase<typeof schema>
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

        let imageUploaded;
        if (images) {
            const uploadParams = {
                Bucket: config.awsBucketName,
                Key: images.originalname,
                Body: images.buffer,
            };

            const parallelUploads3 = new Upload({
                client: this.s3Client,
                tags: [], // optional tags
                queueSize: 4, // optional concurrency configuration
                leavePartsOnError: false, // optional manually handle dropped parts
                params: uploadParams,
            });

            const progressCallback = (progress) => {
                console.log(progress);
            };

            parallelUploads3.on('httpUploadProgress', progressCallback);

            const image = await parallelUploads3.done();

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

    findAll() {
        return `This action returns all posts`;
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
