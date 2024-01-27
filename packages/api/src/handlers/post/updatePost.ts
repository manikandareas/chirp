import { UpdatePostDto } from '@chirp/dto';
import { useMutation } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, MutationConfig } from '../../lib';
import { useApiClient } from '../../providers';

type UpdatePost = {
    statusCode: number;
    data: {
        message: string;
    };
};

export const updatePost: ApiFn<
    UpdatePostDto & { postId: string },
    AxiosPromise<UpdatePost>
> = (updatePostDto, { axios = defaultAxios }) => {
    const { postId, ...body } = updatePostDto;
    return axios.patch(`/posts/${postId}`, body);
};

type MutationFnType = typeof updatePost;

export const useUpdatePostMutation = (
    config: MutationConfig<MutationFnType> = {},
) => {
    const { axios } = useApiClient();
    return useMutation({
        mutationFn: (updatePostDto) => updatePost(updatePostDto, { axios }),
        ...config,
    });
};
