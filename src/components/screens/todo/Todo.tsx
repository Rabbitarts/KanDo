import { FC, useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { LuMoreVertical } from 'react-icons/lu'

import styles from './Todos.module.scss'
import CustomCheckbox from './checkbox/CustomCheckbox'
import TodoModal from './modal/TodoModal'
import { ITodoProps } from './todo.interface'

const Todo: FC<ITodoProps> = ({ todo, updateTodo, deleteTodo, loadTodos }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div key={todo.id} className={styles.todos}>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<CustomCheckbox todo={todo} updateTodo={updateTodo} />
					<span className={todo.is_complete ? 'line-through' : 'text-base'}>
						{todo.task}
					</span>
				</div>
				<div className={styles.right}>
					<button onClick={openModal} className={styles.menu}>
						<LuMoreVertical size={24} />
					</button>
					<button onClick={() => deleteTodo(todo)} className={styles.delete}>
						<BiTrashAlt size={24} />
					</button>
				</div>
			</div>
			{/* <div className={styles.badgeCon}>
				<div className={styles.badge}>UX Design</div>
			</div> */}
			{isModalOpen && (
				<TodoModal
					onClose={closeModal}
					todo={todo}
					onDelete={deleteTodo}
					fetchTodos={loadTodos}
				/>
			)}
		</div>
	)
}

export default Todo
