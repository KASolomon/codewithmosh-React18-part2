import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";


const useAppQuery = <T>(endpoint: string, queryKey: any[], params?: {}) => {
  const apiClient = new ApiClient<T>(endpoint);
  return useQuery<T[], Error>({
    queryKey,
    queryFn: apiClient.getAll,
  });
};
export default useAppQuery;
