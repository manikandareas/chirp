import { useMutation } from "@tanstack/react-query";
import { ApiFn, MutationConfig } from "../../lib";
import { CreatePostDto } from "@chirp/dto";
import defaultAxios, { AxiosPromise } from "axios";
import type { InferSelectModel } from "@chirp/db/drizzle-orm";
import { users } from "@chirp/db";
import { useApiClient } from "../../providers/ApiClientProvider";

export type Post = Omit<InferSelectModel<typeof users>, "password">;

type CreatePostDtoWithImage = CreatePostDto & {
  images: (File | Blob | MediaSource)[];
};

export const createPost: ApiFn<CreatePostDtoWithImage, AxiosPromise<Post>> = (
  createPostDTO,
  { axios = defaultAxios }
) => {
  const formData = new FormData();

  formData.append("authorId", createPostDTO.authorId);
  formData.append("content", createPostDTO.content);
  formData.append("images", createPostDTO.images[0] as File);

  return axios.post("/posts", formData);
};

type MutationFnType = typeof createPost;

export const useCreatePostMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body: CreatePostDtoWithImage) => createPost(body, { axios }),
    ...config,
  });
};
