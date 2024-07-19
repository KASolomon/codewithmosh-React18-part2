import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAppQuery = <T>(endpoint: string, queryKey: any[], params?: {}) => {
  return useQuery<T[], Error>({
    queryKey,
    queryFn: () =>
      axios
        .get<T[]>(`https://jsonplaceholder.typicode.com${endpoint}`, { params })
        .then((res) => res.data),
  });
};
export default useAppQuery;
