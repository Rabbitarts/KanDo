import { ITodo } from '@/types/todo.types'

export interface ITodoProps {
	todo: ITodo
	updateTodo: (todo: ITodo) => void
	deleteTodo: (todo: ITodo) => void
	loadTodos: () => void
}
