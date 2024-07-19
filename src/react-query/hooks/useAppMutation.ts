import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const useAppMutation = <T> (queryKey : string, endpoint : string , onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: T) =>
      axios
        .post<T>(`https://jsonplaceholder.typicode.com/${endpoint}`, newData)
        .then((res) => res.data),

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
