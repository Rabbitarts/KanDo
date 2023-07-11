import { ITodo } from '@/types/todo.types'

export interface IListMenu {
	onClose: () => void
	onDelete: (todo: ITodo) => void
	todo: ITodo
	fetchTodos: () => void
}
