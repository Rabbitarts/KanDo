import { FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { BsThreeDots } from 'react-icons/bs'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import styles from './Card.module.scss'
import CardMenu from './menu/CardMenu'
import { tagColors } from './tagColors'
import { supabase } from '@/supabase/server'
import { ICardData } from '@/types/board.types'

interface ICardProps {
	card: ICardData
	index: number
	fetchTask: () => void
}

const Card: FC<ICardProps> = ({ card, index, fetchTask }) => {
	const [showModal, setShowModal] = useState(false)
	const [tags, setTags] = useLocalStorage<string[]>(
		`card_tags_${card.id}`,
		card.tags || []
	)

	const cardDelete = async () => {
		await supabase.from('tasks').delete().eq('id', card.id)
		fetchTask()
		
	}

	const handleMenuOpen = () => {
		setShowModal(true)
	}

	const handleMenuClose = () => {
		setShowModal(false)
	}

	const handleAddTag = (newTag: any) => {
		setTags([...tags, newTag])
	}

	const handleDeleteTag = (tag: string) => {
		setTags(prevTags => prevTags.filter(t => t !== tag))
	}

	return (
		<>
			<Draggable draggableId={card.id} index={index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`${styles.card} ${
							snapshot.isDragging ? styles.dragging : ''
						}`}
					>
						<span className={styles.text}>{card.description}</span>
						<div className={styles.downMenu}>
							<div className={styles.tags}>
								{tags.map((tag, index) => (
									<span
										key={index}
										className={styles.tag}
										style={{
											backgroundColor: tagColors[tag] || '#38d97e'
										}}
									>
										{tag}
									</span>
								))}
							</div>
							<BsThreeDots
								className={styles.menuIcon}
								onClick={handleMenuOpen}
							/>
						</div>
					</div>
				)}
			</Draggable>

			{showModal && (
				<CardMenu
					onClose={handleMenuClose}
					onDelete={cardDelete}
					card={card}
					tags={tags}
					onAddTag={handleAddTag}
					onDeleteTag={handleDeleteTag}
					updateTasks={fetchTask}
					// subtasks={subtasks}
					// onSubtaskToggle={handleSubtaskToggle}
				/>
			)}
		</>
	)
}

export default Card
