import { CommentsModule } from '~/comments/comments.module';
import { PostsModule } from '~/posts/posts.module';

export const postsAndCommentsRoutes = [
    {
        path: '/posts',
        module: PostsModule,
        children: [
            {
                path: ':postId',
                module: CommentsModule,
            },
        ],
    },
];
