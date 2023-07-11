import { FC } from 'react'
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi'

import { ISubtask } from './subtask.interface'
import styles from './subtasks.module.scss'

interface ISubtasks {
	subtasks: ISubtask[]
	onToggle: (subtaskId: string) => void
}

const Subtasks: FC<ISubtasks> = ({ subtasks, onToggle }) => {
	const handleToggle = (subtaskId: string) => {
		onToggle(subtaskId)
	}

	return (
		<div className={styles.subtasks}>
			{subtasks.map(subtask => (
				<div key={subtask.id} className={styles.subtask}>
					<div
						className={styles.toggle}
						onClick={() => handleToggle(subtask.id)}
					>
						{subtask.completed ? (
							<HiCheckCircle size={20} />
						) : (
							<HiOutlineCheckCircle size={20} />
						)}
					</div>
					<span
						className={`${styles.description} ${
							subtask.completed ? styles.completed : ''
						}`}
					>
						{subtask.description}
					</span>
				</div>
			))}
		</div>
	)
}

export default Subtasks
