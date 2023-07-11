import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'

import styles from './Board.module.scss'
import { supabase } from '@/supabase/server'

interface IAddBoard {
	onBoardAdded: () => void
}

const AddBoard: FC<IAddBoard> = ({ onBoardAdded }) => {
	const [showInput, setShowInput] = useState(false)
	const [newBoardTitle, setNewBoardTitle] = useState('')

	const handleCreateBoard = async () => {
		if (newBoardTitle.trim() === '') {
			return
		}

		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user !== null) {
			const { error } = await supabase
				.from('boards')
				.insert({ title: newBoardTitle, user_id: user.id })

			if (error) {
				console.error('Error creating board:', error)
			} else {
				onBoardAdded()
				setNewBoardTitle('')
				setShowInput(false)
			}
		}
	}

	const handleAddBoardClick = () => {
		setShowInput(true)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewBoardTitle(e.target.value)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleCreateBoard()
		}
	}

	return (
		<div className={styles.AddBoard}>
			{showInput ? (
				<div className='flex items-center gap-2'>
					<input
						type='text'
						value={newBoardTitle}
						placeholder='Board title...'
						className={styles.input}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
					<button onClick={handleCreateBoard} className={styles.create}>
						<HiPlus size={24} />
					</button>
				</div>
			) : (
				<button onClick={handleAddBoardClick} className={styles.add}>
					<HiPlus size={24} /> Add Board
				</button>
			)}
		</div>
	)
}

export default AddBoard
