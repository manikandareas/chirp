import { useMutation } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, MutationConfig } from '../../lib';
import { useApiClient } from '../../providers';

export type LikeResponse = {
    message: string;
    statusCode: number;
};

export const likePost: ApiFn<string, AxiosPromise<LikeResponse>> = (
    postId,
    { axios = defaultAxios },
) => {
    return axios.post(`/posts/likes/${postId}`);
};

type MutationFnType = typeof likePost;

export const useLikePostMutation = (
    config: MutationConfig<MutationFnType> = {},
) => {
    const { axios } = useApiClient();
    return useMutation({
        mutationFn: (postId: string) => likePost(postId, { axios }),
        ...config,
    });
};
