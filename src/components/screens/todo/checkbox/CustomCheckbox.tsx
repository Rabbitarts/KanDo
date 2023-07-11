import { FC, useState } from 'react'
import { FiCheck } from 'react-icons/fi'

import styles from './Checkbox.module.scss'
import { ITodo } from '@/types/todo.types'

interface ICustomCheckbox {
	todo: ITodo
	updateTodo: (task: ITodo) => void
}

const CustomCheckbox: FC<ICustomCheckbox> = ({ todo, updateTodo }) => {
	const [isChecked, setIsChecked] = useState(todo.is_complete)

	const handleCheckboxChange = () => {
		const updatedTodoTask = { ...todo, is_complete: !isChecked }
		setIsChecked(!isChecked)
		updateTodo(updatedTodoTask)
	}

	return (
		<div className='custom-checkbox'>
			<div
				className={`checkbox-icon ${isChecked ? 'checked' : ''}`}
				onClick={handleCheckboxChange}
			>
				{isChecked ? (
					<div className={styles.checkIcon}>
						<FiCheck />
					</div>
				) : (
					<div className={styles.checkedIcon}></div>
				)}
			</div>
		</div>
	)
}

export default CustomCheckbox
