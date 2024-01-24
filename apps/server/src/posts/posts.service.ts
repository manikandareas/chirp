import * as schema from '@chirp/db';
import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import {
    Inject,
    Injectable,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { desc, eq, isNull } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { AwsService } from '~/aws/aws.service';
import { CommentsService } from '~/comments/comments.service';
import { DrizzleService } from '~/drizzle/drizzle.service';
import { LikesService } from '~/likes/likes.service';

@Injectable()
export class PostsService {
    private readonly db: NeonHttpDatabase<typeof schema>;
    constructor(
        private readonly drizzle: DrizzleService,
        private readonly awsService: AwsService,
        @Inject(forwardRef(() => LikesService))
        private readonly likesService: LikesService,
        private readonly commentsService: CommentsService
    ) {
        this.db = this.drizzle.getDb();
    }
    /**
     * Creates a new post with the given data and optional images.
     *
     * @param {CreatePostDto} createPostDto - The data for creating the post.
     * @param {any} req - The user object from the request.
     * @param {Express.Multer.File} images - Optional images to be uploaded with the post.
     * @return {Promise<{ createdPost: any, imageUploaded?: any }>} - A promise that resolves to an object containing the created post and optionally the uploaded image.
     */
    async create(
        createPostDto: CreatePostDto,
        req: any,
        images?: Array<Express.Multer.File>
    ) {
        const createdPost = await this.db
            .insert(schema.posts)
            .values(createPostDto)
            .returning();
        // * if there is an image when posting
        if (images) {
            for (const image of images) {
                const uniqueKeyFileName = await this.generateUniqueKeyFile(
                    image.originalname,
                    req.user.username
                );
                const imageLocation = await this.awsService.uploadToS3(
                    uniqueKeyFileName,
                    image.buffer,
                    image.mimetype
                );
                await this.db.insert(schema.images).values({
                    url: imageLocation.Location,
                    key: imageLocation.Key,
                    postId: createdPost[0].id,
                });
            }
        }
        return {
            message: 'Create Post Success!',
        };
    }

    /**
     * Retrieves all posts from the database sorted from newest by date updated.
     *
     * @param {string} userId - The ID of the user.
     * @return {Promise<Post[]>} An array of post objects.
     */
    async findAll(userId: string) {
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
                likes: {
                    where: (likes, { eq }) => eq(likes.userId, userId),
                    columns: {
                        userId: true,
                    },
                },
                comments: {
                    where: isNull(schema.comments.parentId),
                    with: {
                        replies: {
                            columns: {
                                id: true,
                            },
                            with: {
                                replies: {
                                    columns: {
                                        id: true,
                                    },
                                    with: {
                                        replies: {
                                            columns: {
                                                id: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: [desc(schema.posts.updatedAt)],
        });

        let commentsNumber = 0;

        posts.map((post) => {
            for (const comment of post.comments) {
                commentsNumber += this.addRepliesCount(comment);
                this.addRepliesCount(comment);
            }
        });

        // adds number of comments to each post, is user liked the post and ignore comments and likes fields
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return posts.map(({ likes, comments, ...post }, i) => {
            return {
                ...post,
                commentsNumber:
                    posts[i].comments.length > 0
                        ? commentsNumber + posts[i].comments.length
                        : 0,
                isUserLiked: !!likes.length,
            };
        });
    }

    async findOneById(id: string, userId?: string) {
        this.validateId(id);

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
                likes: {
                    where: (likes, { eq }) => eq(likes.userId, userId),
                    columns: {
                        userId: true,
                    },
                },
            },
        });

        if (!postDataById) {
            throw new NotFoundException('Post Not Found');
        }

        postDataById['comments'] =
            await this.commentsService.getByPostIdWithReplies(id);

        let commentsNumber = postDataById['comments'].length;

        for (const comment of postDataById['comments']) {
            commentsNumber += this.addRepliesCount(comment);
            this.addRepliesCount(comment);
        }

        // return postDataById with commentsNumber and isUserLiked;
        return {
            ...postDataById,
            commentsNumber,
            isUserLiked: !!postDataById.likes.length,
        };
    }

    /**
     * Calculates the total number of replies for a given comment, including
     * nested replies within the comment's replies.
     *
     * @param {object} comment - The comment object to calculate replies for.
     * @return {number} The total number of replies for the given comment.
     */
    addRepliesCount(comment) {
        let repliesNumber = 0;
        if (!comment.replies || comment.replies.length === 0) {
            comment.repliesNumber = 0;
        } else {
            comment.repliesNumber = comment.replies.length;
            for (const reply of comment.replies) {
                this.addRepliesCount(reply);
            }
        }
        return (repliesNumber += comment.repliesNumber);
    }

    /**
     * Updates a post with the given ID using the provided data.
     *
     * @param {string} id - The ID of the post to update.
     * @param {UpdatePostDto} updatePostDto - The data to update the post with.
     * @return {Promise<any>} A promise that resolves to the updated post.
     */
    async update(id: string, updatePostDto: UpdatePostDto) {
        this.validateId(id);

        await this.db
            .update(schema.posts)
            .set({ updatedAt: new Date(), content: updatePostDto.content })
            .where(eq(schema.posts.id, id))
            .returning();

        return {
            message: 'Update Post Success!',
        };
    }

    /**
     * Removes a post with the given ID.
     *
     * @param {string} id - The ID of the item to be removed.
     * @return {Promise<void>} - A promise that resolves when the item is successfully removed.
     */
    async delete(id: string) {
        this.validateId(id);

        const imageKeyToBeDeleted = await this.db.query.images.findMany({
            where: (image, { eq }) => eq(image.postId, id),
            columns: {
                key: true,
            },
        });

        await Promise.all([
            this.deleteImagesFromS3(imageKeyToBeDeleted),
            this.deletePostFromDatabase(id),
        ]);

        return { message: 'Delete Post Success!' };
    }

    /**
     * Validates an ID against a specific pattern.
     *
     * @param {string} id - The ID to be validated.
     * @return {boolean} Returns true if the ID is valid.
     */
    validateId(id: string) {
        const idPattern =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        if (!idPattern.test(id)) {
            throw new NotFoundException('Post Not Found');
        }
        return true;
    }

    /**
     * Deletes images from S3.
     *
     * @param {Array} images - An array of objects representing the images to delete.
     *                        Each object should have a 'key' property indicating the image's key.
     * @return {Promise<void>} - A promise that resolves when all the images are deleted from S3.
     */
    async deleteImagesFromS3(
        images: {
            key: string;
        }[]
    ) {
        if (images.length > 0) {
            await Promise.all(
                images.map(async ({ key }) => {
                    await this.awsService.deleteFromS3(key);
                })
            );
        }
    }

    /**
     * Deletes a post from the database.
     *
     * @param {string} id - The ID of the post to delete.
     * @return {Promise<void>} - A Promise that resolves when the post is successfully deleted.
     */
    async deletePostFromDatabase(id: string) {
        await this.db.delete(schema.posts).where(eq(schema.posts.id, id));
    }

    /**
     * Generates a unique key file name based on the provided key and username.
     *
     * @param {string} key - The key to be included in the unique key file.
     * @param {string} username - The username to be included in the unique key file.
     * @return {Promise<string>} The generated unique key file.
     */
    async generateUniqueKeyFile(key: string, username: string) {
        const uniqueKey = `${username}-${Date.now()}-${key}`;
        return uniqueKey;
    }

    /**
     * Check if the user is the owner of the post.
     *
     * @param {string} id - The ID of the post.
     * @param {any} user - The user object.
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user is the owner of the post.
     */
    async isOwnerPost(id: string, user): Promise<boolean> {
        const requestedPostId = await this.db.query.posts
            .findFirst({
                where: (posts, { eq }) => eq(posts.id, id),
                columns: {
                    authorId: true,
                },
                with: {
                    author: {
                        columns: {
                            id: true,
                        },
                    },
                },
            })
            .then((post) => post?.authorId);
        return requestedPostId === user.id;
    }
}
