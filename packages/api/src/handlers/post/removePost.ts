import defaultAxios, { AxiosPromise } from "axios";
import { ApiFn, MutationConfig } from "../../lib";
import { useApiClient } from "../../providers/ApiClientProvider";
import { useMutation } from "@tanstack/react-query";

export const removePost: ApiFn<string, AxiosPromise<undefined>> = (
  id,
  { axios = defaultAxios }
) => {
  return axios.delete(`/posts/${id}`);
};

type MutationFnType = typeof removePost;

export const useRemovePostMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationKey: ["remove-post"],
    mutationFn: (body) => {
      return removePost(body, { axios });
    },
    ...config,
  });
};
