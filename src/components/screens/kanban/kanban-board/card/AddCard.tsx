import { ChangeEvent, FC, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'

import styles from './Card.module.scss'
import { supabase } from '@/supabase/server'

interface IAddCard {
	boardId: string
	onCardAdded: () => void
}

const AddCard: FC<IAddCard> = ({ boardId, onCardAdded }) => {
	const [showInput, setShowInput] = useState(false)
	const [newCardTitle, setNewCardTitle] = useState('')

	const handleAddCard = async () => {
		if (newCardTitle.trim() === '') {
			return
		}

		const { error } = await supabase.from('tasks').insert({
			description: newCardTitle,
			board_id: boardId
		})

		if (error) {
			console.error('Error creating card:', error)
		} else {
			onCardAdded()
			setNewCardTitle('')
			setShowInput(false)
		}
	}

	const handleInputClick = () => {
		setShowInput(true)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewCardTitle(e.target.value)
	}

	return (
		<div className={styles.addCard}>
			{showInput ? (
				<div className='flex gap-2'>
					<input
						type='text'
						className={styles.input}
						placeholder='Task text...'
						value={newCardTitle}
						onChange={handleInputChange}
						autoFocus
					/>
					<button onClick={handleAddCard} className={styles.create}>
						<HiPlus size={24} />
					</button>
				</div>
			) : (
				<button onClick={handleInputClick} className={styles.add}>
					<HiPlus size={24} />
					Card
				</button>
			)}
		</div>
	)
}

export default AddCard
