import { Routes } from '@nestjs/core';
import { LikesModule } from '~/likes/likes.module';
import { PostsModule } from '~/posts/posts.module';

export const postsAndLikesRoutes: Routes = [
    {
        path: '/posts',
        module: PostsModule,
        children: [
            {
                path: '/likes',
                module: LikesModule,
            },
        ],
    },
];
