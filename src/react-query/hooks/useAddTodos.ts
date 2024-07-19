import { TODOS_CACHE_KEY } from "../config/constants";
import useAppMutation from "./useAppMutation";
import { Todo } from "./useTodos";


const useAddTodos = (onAdd: () => void) =>
  useAppMutation<Todo>(TODOS_CACHE_KEY, "/todos", onAdd);
export default useAddTodos;
