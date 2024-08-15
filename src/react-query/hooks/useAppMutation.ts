import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";


const useAppMutation = <T> (queryKey : string, endpoint : string , onAdd: () => void) => {
  const apiClient = new ApiClient<T>(endpoint);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: T) =>apiClient.post(newData),

    onMutate: (serverResponse) => {
      const oldState = queryClient.getQueryData<T[]>([queryKey]);

      queryClient.setQueryData<T[]>([queryKey], (oldData) => [
        serverResponse,
        ...(oldData || []),
      ]);
      onAdd();
      return { oldState };
    },
    onSuccess: (serverResponse, newData) => {
      queryClient.setQueryData<T[]>([queryKey], (oldData) =>
        oldData
          ? oldData.map((item) => (item === newData ? serverResponse : item))
          : [serverResponse]
      );
    },

    onError: (error, newData, context) => {
      if (context) queryClient.setQueryData([queryKey], context?.oldState);
    },
  });
};
export default useAppMutation;
