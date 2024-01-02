import { InferSelectModel } from '@chirp/db/drizzle-orm';
import * as schema from '@chirp/db';

export type Post = {
    id: number;
    createdAt: string;
    updatedAt: string;
    url: string;
    postId: string;
    post: {
        id: string;
        content: string;
        authorId: string;
        createdAt: string;
        updatedAt: string;
    };
};
