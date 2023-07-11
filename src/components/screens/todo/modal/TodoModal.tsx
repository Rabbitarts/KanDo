import { FC, FormEvent, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

import styles from './ModalList.module.scss'
import { IListMenu } from './menu.interface'
import { supabase } from '@/supabase/server'

const TodoModal: FC<IListMenu> = ({ onClose, todo, onDelete, fetchTodos }) => {
	const [taskText, setTaskText] = useState<string>(todo.task)
	const [loading, setLoading] = useState<boolean>(false)

	const TaskSave = async (e: FormEvent) => {
		setLoading(true)
		e.preventDefault()
		await supabase.from('todos').update({ task: taskText }).eq('id', todo.id)
		fetchTodos()
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}

	const handleDeleteTodo = async () => {
		onDelete(todo)
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={styles.title}>Edit todo</h2>
					<button onClick={onClose}>
						<HiXMark size={26} />
					</button>
				</div>

				<form onSubmit={TaskSave} className={styles.form}>
					<input
						type='text'
						className={styles.task}
						value={taskText}
						onChange={e => setTaskText(e.target.value)}
					/>
					<button type='submit' className={styles.save}>
						Save {loading ? <div className={styles.loading}></div> : ''}
					</button>
				</form>

				<button onClick={handleDeleteTodo} className={styles.delete}>
					Delete todo
				</button>
			</div>
		</div>
	)
}

export default TodoModal
