import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';
import { SetOptional } from 'type-fest';

import { ApiFn } from '../../lib';
import { useApiClient } from '../../providers';

export type UserProfile = {
    statusCode: number;
    data: Data;
};

type Data = {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    username: string;
    dob: string;
    email: string;
    avatarUrl: string;
    gender: 'male' | 'female';
    address: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
};

type Post = {
    id: string;
    content: string;
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
    images: Image[];
    isUserLiked: boolean;
};

type Image = {
    id: number;
    key: string;
    url: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
};
export const getProfileByUsername: ApiFn<string, AxiosPromise<UserProfile>> = (
    username: string,
    { axios = defaultAxios },
) => {
    return axios.get(`/users/${username}?posts=true`);
};

export const useGetProfileByUsernameQuery = (
    username: string,
    options?: SetOptional<
        UseQueryOptions<unknown, unknown, UserProfile, any[]>,
        'queryKey'
    >,
) => {
    const { axios, api } = useApiClient();
    return useQuery({
        queryKey: ['profile', username],
        queryFn: async () =>
            await api(getProfileByUsername(username, { axios })),
        ...options,
    });
};
