import { CreatePostDto } from '@chirp/dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';
import { JwtGuard } from '~/auth/guards/jwt.guard';
import { OwnerGuard } from '../guard/owner.guard';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import {
    BadRequestException,
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

    describe('create', () => {
        const createPostDto: CreatePostDto = {
            content: 'This is the content of my post.',
            authorId: '3rdfe-3r3df3-3afg3',
        };
        const userData = { user: { id: 'user123', username: 'john_doe' } };
        const createdPost = {
            message: 'Create Post Success!',
        };
        let images: Express.Multer.File[] = [];

        it('should return 401 Unauthorized if user does not have valid JWT', async () => {
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

        it('should create a new post without if user has valid JWT', async () => {
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
});
