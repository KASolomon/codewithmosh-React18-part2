import useAppQuery from "./useAppQuery";
export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const useTodos = () => useAppQuery<Todo>("/todos", ["todos"]);
export default useTodos;
