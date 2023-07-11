import { FC, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { HiEllipsisVertical, HiMiniChevronRight } from 'react-icons/hi2'

import AddCard from '../card/AddCard'
import Card from '../card/Card'

import styles from './Board.module.scss'
import CardCount from './card-count/CardCount'
import BoardMenu from './menu/BoardMenu'
import { supabase } from '@/supabase/server'
import { IBoardData, ICardData } from '@/types/board.types'

interface IBoardProps {
	board: IBoardData
	index: number
	onDelete: (boardId: string) => void
	handleCardAdded: () => void
	fetchBoards: () => void
}

const Board: FC<IBoardProps> = ({
	board,
	handleCardAdded,
	onDelete,
	index,
	fetchBoards
}) => {
	const [showMenu, setShowMenu] = useState(false)

	const handleDeleteBoard = async () => {
		await supabase.from('boards').delete().eq('id', board.id)
		await supabase.from('tasks').delete().eq('board_id', board.id)
		setShowMenu(false)
		onDelete(board.id)
	}

	const handleMenuOpen = () => {
		setShowMenu(true)
	}

	const handleMenuClose = () => {
		setShowMenu(false)
	}

	return (
		<Draggable draggableId={board.id} index={index}>
			{(provided, snapshot) => (
				<div
					className={`${styles.board} ${
						snapshot.isDragging ? styles.dragging : ''
					}`}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<div className={styles.header}>
						<div className='flex gap-1' {...provided.dragHandleProps}>
							<HiMiniChevronRight size={32} className={styles.titleIcon} />
							<h3 className={styles.title}>
								{board.title}

								<CardCount boardId={board.id} />
							</h3>
						</div>
						<div>
							<button onClick={handleMenuOpen} className={styles.menuBtn}>
								<HiEllipsisVertical size={26} />
							</button>
						</div>
					</div>

					<Droppable droppableId={board.id} type='CARD'>
						{(provided, snapshot) => (
							<div
								className={`${styles.cardContainer} ${
									snapshot.isDraggingOver ? styles.droppable : ''
								} `}
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{board.tasks?.map((card: ICardData, index: number) => (
									<Card
										key={card.id}
										card={card}
										index={index}
										fetchTask={handleCardAdded}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<AddCard boardId={board.id} onCardAdded={handleCardAdded} />
					{showMenu && (
						<BoardMenu
							onClose={handleMenuClose}
							onDelete={handleDeleteBoard}
							board={board}
							fetchTitle={fetchBoards}
						/>
					)}
				</div>
			)}
		</Draggable>
	)
}

export default Board
