import { useQuery } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, ExtractFnReturnType, QueryConfig } from '../../lib';
import { useApiClient } from '../../providers';

export type PostsPromise = {
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
    }[];
};

export const getPosts: ApiFn<object, AxiosPromise<PostsPromise>> = (
    {},
    { axios = defaultAxios },
) => {
    return axios.get('/posts');
};

type QueryFnType = typeof getPosts;

type UseGetPostsQueryOption = {
    config?: QueryConfig<QueryFnType>;
};

export const useGetPostsQuery = ({ config }: UseGetPostsQueryOption = {}) => {
    const { axios } = useApiClient();
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['posts'],
        queryFn: async () => await getPosts({}, { axios }),
        ...config,
    });
};
