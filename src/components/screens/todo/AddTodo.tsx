import { FC, FormEvent, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'

import styles from './Todos.module.scss'

interface IAddTodo {
	addTodo: (task: string) => void
}

const AddTodo: FC<IAddTodo> = ({ addTodo }) => {
	const [task, setTask] = useState('')

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		addTodo(task)
		setTask('')
	}

	return (
		<form onSubmit={handleSubmit} className={styles.addForm}>
			<input
				type='text'
				placeholder='Task text...'
				className={styles.input}
				value={task}
				onChange={e => setTask(e.target.value)}
			/>

			<button type='submit' className={styles.addBtn}>
				<HiPlus size={28} />
			</button>
		</form>
	)
}

export default AddTodo
