import { FC, useEffect, useState } from 'react'

import AddTodo from './AddTodo'
import Todo from './Todo'
import styles from './Todos.module.scss'
import { supabase } from '@/supabase/server'
import { ITodo } from '@/types/todo.types'

const List: FC = () => {
	const [todos, setTodos] = useState<ITodo[]>([])

	useEffect(() => {
		loadTodos()
	}, [])

	const loadTodos = async () => {
		const { data } = await supabase
			.from('todos')
			.select('*')
			.order('inserted_at', { ascending: false })

		setTodos(data || [])
	}

	const addTodo = async (task: string) => {
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user !== null) {
			const newTodo = {
				user_id: user.id,
				task
			}

			const result = await supabase
				.from('todos')
				.insert(newTodo)
				.select()
				.single()

			setTodos([result.data, ...todos])
		}
	}

	const updateTodo = async (todo: ITodo) => {
		const updatedTodoTask = { ...todo, is_complete: !todo.is_complete }

		const result = await supabase
			.from('todos')
			.update({ is_complete: updatedTodoTask.is_complete })
			.eq('id', todo.id)
			.select()
			.single()

		const updated = todos.map(item => {
			if (item.id === todo.id && result.data !== null) {
				item.is_complete = result.data.is_complete
			}
			return item
		})

		setTodos(updated)
	}

	const deleteTodo = async (todo: ITodo) => {
		await supabase.from('todos').delete().eq('id', todo.id)
		const updated = todos.filter(item => item.id !== todo.id)
		setTodos(updated)
	}

	return (
		<div className={styles.list}>
			<div className={styles.header}>
				<h1 className={styles.title}>Todo List</h1>
			</div>

			<AddTodo addTodo={addTodo} />

			<div className='flex flex-col gap-5'>
				{todos.map(todo => (
					<Todo
						key={todo.id}
						todo={todo}
						updateTodo={updateTodo}
						loadTodos={loadTodos}
						deleteTodo={deleteTodo}
					/>
				))}
			</div>
		</div>
	)
}

export default List
