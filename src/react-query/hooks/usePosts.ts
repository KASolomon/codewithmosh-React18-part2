import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
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
      return axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * 10,
            _limit: queryObject.pageSize,
          },
        })
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};
// "https://jsonplaceholder.typicode.com/posts";
export default usePosts;
