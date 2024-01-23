import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';
import { SetOptional } from 'type-fest';

import { ApiFn } from '../../lib';
import { useApiClient } from '../../providers';

export type Post = {
    statusCode: number;
    data: Data;
};

export type Data = {
    id: string;
    content: string;
    totalLikes: number;
    createdAt: string;
    updatedAt: string;
    images: any[];
    author: Author;
    comments: Comment[];
    isUserLiked: boolean;
};

type Author = {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string;
};

export type Comment = {
    id: string;
    message: string;
    authorId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    repliesNumber: number;
    parentId: string;
    author: AuthorComment;
    parent?: ParentAuthor;
    replies?: Comment[];
};

export type ParentAuthor = {
    author: {
        username: string;
    };
};
export type AuthorComment = {
    id: string;
    username: string;
    fullName: string;
    avatarUrl: string;
};
//   export type Reply = {
//     id: string
//     message: string
//     authorId: string
//     postId: string
//     createdAt: string
//     updatedAt: string
//     parentId: string
//     author: Author2
//     parent: Parent
//     replies: Reply2[]
//     repliesNumber: number
//   }

export const getPostById: ApiFn<string, AxiosPromise<Post>> = (
    postId: string,
    { axios = defaultAxios },
) => {
    return axios.get(`/posts/${postId}`);
};

export const useGetPostByIdQuery = (
    postId: string,
    options?: SetOptional<
        UseQueryOptions<unknown, unknown, Post, any[]>,
        'queryKey'
    >,
) => {
    const { axios, api } = useApiClient();

    return useQuery({
        queryKey: ['posts', postId],
        queryFn: async () => await api(getPostById(postId, { axios })),
        ...options,
    });
};
