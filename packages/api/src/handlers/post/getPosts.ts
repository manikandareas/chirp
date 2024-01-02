import defaultAxios, { AxiosPromise } from "axios";
import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib";
import { useApiClient } from "../../providers";
import { useQuery } from "@tanstack/react-query";

type PostsPromise = {
  statusCode: number;
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
    url: string;
    postId: string;
    post: {
      id: string;
      content: string;
      authorId: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

export const getPosts: ApiFn<object, AxiosPromise<PostsPromise>> = (
  {},
  { axios = defaultAxios },
) => {
  return axios.get("/posts");
};

type QueryFnType = typeof getPosts;

type UseGetPostsQueryOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetPostsQuery = ({ config }: UseGetPostsQueryOption = {}) => {
  const { axios } = useApiClient();
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["posts"],
    queryFn: () => getPosts({}, { axios }),
    ...config,
  });
};
