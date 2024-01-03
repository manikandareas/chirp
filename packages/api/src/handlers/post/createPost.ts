import { useMutation } from "@tanstack/react-query";
import { ApiFn, MutationConfig } from "../../lib";
import { CreatePostDto } from "@chirp/dto";
import defaultAxios, { AxiosPromise } from "axios";
import { useApiClient } from "../../providers/ApiClientProvider";

export type PostResponse = {
  statusCode: number;
};

type CreatePostDtoWithImage = CreatePostDto & {
  images: (File | Blob | MediaSource)[];
};

export const createPost: ApiFn<
  CreatePostDtoWithImage,
  AxiosPromise<PostResponse>
> = (createPostDTO, { axios = defaultAxios }) => {
  const formData = new FormData();

  formData.append("authorId", createPostDTO.authorId);
  formData.append("content", createPostDTO.content);

  createPostDTO.images.forEach((image) => {
    formData.append("images", image as File);
  });

  return axios.post("/posts", formData);
};

type MutationFnType = typeof createPost;

export const useCreatePostMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body: CreatePostDtoWithImage) => createPost(body, { axios }),
    ...config,
  });
};
