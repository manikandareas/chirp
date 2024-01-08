import { CreatePostDto, UpdatePostDto } from '@chirp/dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { OwnerGuard } from '../guard/owner.guard';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    ValidationPipe,
} from '@nestjs/common';

jest.mock('../posts.service');

describe('PostsController', () => {
    let postsController: PostsController;
    let postsService: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [PostsService, JwtGuard, OwnerGuard, JwtService],
        }).compile();

        postsService = module.get<PostsService>(PostsService);
        postsController = module.get<PostsController>(PostsController);
    });
    const jwtGuards = (propertyKey) => {
        const guards = Reflect.getMetadata('__guards__', propertyKey);
        return new guards[0]();
    };

    const ownerGuards = (propertyKey) => {
        const guards = Reflect.getMetadata('__guards__', propertyKey);
        return new guards[1]();
    };

    const validationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    });
    const userData = { user: { id: 'user123', username: 'john_doe' } };

    describe('create', () => {
        const createPostDto: CreatePostDto = {
            content: 'This is the content of my post.',
            authorId: '1',
        };
        const createdPost = {
            message: 'Create Post Success!',
        };
        let images: Express.Multer.File[] = [];

        it('should return 401 Unauthorized if user want to create post but does not have valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.create);
            // Mock the canActivate method to throw an exception
            jest.spyOn(jwtGuard, 'canActivate').mockImplementation(() => {
                throw new UnauthorizedException();
            });

            try {
                await postsController.create(createPostDto, userData, images);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should create a new post with images if user has valid JWT', async () => {
            images = [
                {
                    originalname: 'mas bro',
                    buffer: Buffer.from('../../../uploads/mas bro.jpeg'),
                    fieldname: 'images',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    size: 9517,
                    destination: '../../../uploads',
                    filename: 'mas bro.jpeg',
                    path: '../../../uploads/mas bro.jpeg',
                    stream: new Readable({
                        read() {
                            this.push(
                                Buffer.from('../../../uploads/mas bro.jpeg')
                            );
                            this.push(null); // Indicate the end of the stream
                        },
                    }),
                },
            ];
            const jwtGuard = jwtGuards(PostsController.prototype.create);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(postsService, 'create').mockResolvedValue(createdPost);
            const result = await postsController.create(
                createPostDto,
                userData,
                images
            );

            expect(result).toEqual({
                statusCode: 201,
                data: createdPost,
            });
            expect(postsService.create).toHaveBeenCalledWith(
                createPostDto,
                userData,
                images
            );
        });

        it('should create a new post without images if user has valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.create);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(postsService, 'create').mockResolvedValue(createdPost);
            const result = await postsController.create(
                createPostDto,
                userData,
                images
            );

            expect(result).toEqual({
                statusCode: 201,
                data: createdPost,
            });
            expect(postsService.create).toHaveBeenCalledWith(
                createPostDto,
                userData,
                images
            );
        });

        it('should throw bad request if create post dto is invalid', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.create);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            try {
                // Use the ValidationPipe to validate the DTO
                const dto = await validationPipe.transform(
                    {} as CreatePostDto,
                    {
                        type: 'body',
                        metatype: CreatePostDto,
                    }
                );

                await postsController.create(dto, userData, images);
            } catch (error) {
                expect(error.getResponse()).toEqual({
                    message: expect.arrayContaining([
                        expect.objectContaining({
                            property: 'content',
                            constraints: {
                                isNotEmpty: 'content should not be empty',
                                isString: 'content must be a string',
                            },
                        }),
                        expect.objectContaining({
                            property: 'authorId',
                            constraints: {
                                isNotEmpty: 'authorId should not be empty',
                                isString: 'authorId must be a string',
                            },
                        }),
                    ]),
                    error: 'Bad Request',
                    statusCode: 400,
                });
            }
        });
    });

    describe('findAll', () => {
        it('should return 401 Unauthorized if user want to get all posts but does not have valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.findAll);
            // Mock the canActivate method to throw an exception
            jest.spyOn(jwtGuard, 'canActivate').mockImplementation(() => {
                throw new UnauthorizedException();
            });

            try {
                await postsController.findAll();
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should return all posts if user has valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.findAll);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(postsService, 'findAll').mockResolvedValue([]);
            const result = await postsController.findAll();

            expect(result).toEqual({
                statusCode: 200,
                data: [],
            });

            expect(postsService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOneById', () => {
        const postDataById = {
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            content: 'post content',
            images: [
                {
                    id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    key: 'john-12345678-image.png',
                    url: 'https://bucket-name.bucket.region.amazonaws.com/john-12345678-image.png',
                },
            ],
            author: {
                id: '1',
                fullName: 'John Doe',
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                avatarUrl: 'https://ui-avatars.com/api/?name=john doe',
            },
        };
        it('should return a post data by id if post exists', async () => {
            jest.spyOn(postsService, 'findOneById').mockResolvedValue(
                postDataById
            );
            const result = await postsController.findOneById('1');

            expect(result).toEqual({
                statusCode: 200,
                data: postDataById,
            });

            expect(postsService.findOneById).toHaveBeenCalled();
        });

        it('should throw 404 not found exception if post does not exist', async () => {
            jest.spyOn(postsService, 'findOneById').mockResolvedValue(null);
            try {
                await postsController.findOneById('1');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('update', () => {
        const updatePostDto: UpdatePostDto = {
            content: 'This is the updated content of my post.',
        };
        const updatedPost = [
            {
                content: 'update post',
                authorId: '1',
                id: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        it('should return 401 Unauthorized if user wan to update post but does not have valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.update);
            // Mock the canActivate method to throw an exception
            jest.spyOn(jwtGuard, 'canActivate').mockImplementation(() => {
                throw new UnauthorizedException();
            });

            try {
                await postsController.update('1', updatePostDto);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should throw 403 Forbidden if user want to update post but not the owner of the post', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.update);
            const ownerGuard = ownerGuards(PostsController.prototype.update);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(ownerGuard, 'canActivate').mockReturnValue(false);

            try {
                await postsController.update('1', updatePostDto);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });

        it('should update post if user has valid JWT and is the owner', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.update);
            const ownerGuard = ownerGuards(PostsController.prototype.update);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(ownerGuard, 'canActivate').mockReturnValue(false);
            jest.spyOn(postsService, 'update').mockResolvedValue(updatedPost);
            const result = await postsController.update('1', updatePostDto);

            expect(result).toEqual({
                statusCode: 200,
                data: updatedPost,
            });

            expect(postsService.update).toHaveBeenCalledWith(
                '1',
                updatePostDto
            );
        });
    });

    describe('delete', () => {
        const deletedPost = { message: 'Delete Post Success!' };
        it('should return 401 Unauthorized if user wan to delete post but does not have valid JWT', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.delete);
            // Mock the canActivate method to throw an exception
            jest.spyOn(jwtGuard, 'canActivate').mockImplementation(() => {
                throw new UnauthorizedException();
            });

            try {
                await postsController.delete('1');
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should throw 403 Forbidden if user want to delete post but not the owner of the post', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.delete);
            const ownerGuard = ownerGuards(PostsController.prototype.delete);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(ownerGuard, 'canActivate').mockReturnValue(false);

            try {
                await postsController.delete('1');
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });

        it('should delete post if user has valid JWT and is the owner', async () => {
            const jwtGuard = jwtGuards(PostsController.prototype.delete);
            const ownerGuard = ownerGuards(PostsController.prototype.delete);
            jest.spyOn(jwtGuard, 'canActivate').mockReturnValue(true);
            jest.spyOn(ownerGuard, 'canActivate').mockReturnValue(false);
            jest.spyOn(postsService, 'delete').mockResolvedValue(deletedPost);
            const result = await postsController.delete('1');

            expect(result).toEqual({
                statusCode: 200,
                data: deletedPost,
            });

            expect(postsService.delete).toHaveBeenCalledWith('1');
        });
    });
});
