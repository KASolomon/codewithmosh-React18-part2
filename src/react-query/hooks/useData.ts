import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useData = <T>(endpoint: string, queryKey : string[]) => {
  return useQuery<T[], Error>({
    queryKey,
    queryFn: () =>
      axios
        .get<T[]>(`https://jsonplaceholder.typicode.com${endpoint}`)
        .then((res) => res.data),
  });
};
export default useData;
