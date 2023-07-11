import { ChangeEvent } from 'react'

import { ITodo } from '@/types/todo.types'

export interface ITodoProps {
	todo: ITodo
	updateTodo: (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => void
	deleteTodo: (todo: ITodo) => void
	loadTodos: () => void
}
