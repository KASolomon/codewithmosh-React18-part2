import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import ApiClient from "../services/apiClient";
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId: number | undefined;
  page: number;
  pageSize: number;
}
const usePosts = (queryObject: PostQuery) => {
  const apiClient = new ApiClient<Post>("/posts");

  return useInfiniteQuery<
    Post[],
    Error,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >({
    initialPageParam: 1,
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      return apiClient.getAll({
        _start: (pageParam - 1) * 10,
        _limit: queryObject.pageSize,
      });
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};

export default usePosts;
