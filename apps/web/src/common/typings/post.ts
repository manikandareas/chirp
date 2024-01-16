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
