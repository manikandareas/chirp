import { CreateCommentDto } from '@chirp/dto';
import { useMutation } from '@tanstack/react-query';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, MutationConfig } from '../../lib';
import { useApiClient } from '../../providers';

export type CommentResponse = {
    statusCode: number;
};

export type CreateCommentDTO = CreateCommentDto;
export type CreateCommentDTOPartial = Partial<CreateCommentDTO> & {
    postId: string;
};
export const createComment: ApiFn<
    CreateCommentDTOPartial,
    AxiosPromise<CommentResponse>
> = (createCommentDto, { axios = defaultAxios }) => {
    const { postId, ...body } = createCommentDto;
    return axios.post(`/posts/${postId}/comments`, body);
};

type MutationFnType = typeof createComment;

export const useCreateCommentMutation = (
    config: MutationConfig<MutationFnType> = {},
) => {
    const { axios } = useApiClient();
    return useMutation({
        mutationFn: (createCommentDto: CreateCommentDTOPartial) =>
            createComment(createCommentDto, { axios }),
        ...config,
    });
};
