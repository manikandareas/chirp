import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';
import { SetOptional } from 'type-fest';

import { ApiFn } from '../../lib';
import { useApiClient } from '../../providers';

export type Posts = {
    data: {
        isUserLiked: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        totalLikes: number;
        images: {
            id: number;
            createdAt: string;
            updatedAt: string;
            key: string;
            url: string;
        }[];
        author: {
            id: string;
            fullName: string;
            firstName: string;
            lastName: string;
            username: string;
            avatarUrl: string;
        };
    };
};

export const getPostById: ApiFn<string, AxiosPromise<Posts>> = (
    postId: string,
    { axios = defaultAxios },
) => {
    return axios.get(`/posts/${postId}`);
};

export const useGetPostByIdQuery = (
    postId: string,
    options?: SetOptional<
        UseQueryOptions<unknown, unknown, Posts, any[]>,
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
