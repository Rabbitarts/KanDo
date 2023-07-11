import { supabase } from '@supabase-client/server'
import { FC, useEffect, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import styles from './KanbanBoard.module.scss'
import AddBoard from './board/AddBoard'
import Board from './board/Board'
import { IBoardData } from '@/types/board.types'

const KanbanBoard: FC = () => {
	const [boards, setBoards] = useState<IBoardData[]>([])

	useEffect(() => {
		fetchBoards()
	}, [])

	const fetchBoards = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user !== null) {
			const { data: boards, error } = await supabase
				.from('boards')
				.select('*, tasks(id, description, column_index)')
				.eq('user_id', user.id)

			if (error) {
				console.error('Error fetching boards:', error)
			} else {
				setBoards(boards || [])
			}
		}
	}

	const handleBoardAdded = () => {
		fetchBoards()
	}

	const handleCardAdded = async () => {
		await fetchBoards()
	}

	const handleDeleteBoard = async (boardId: string) => {
		await supabase.from('boards').delete().eq('id', boardId)
		await supabase.from('tasks').delete().eq('board_id', boardId)
		fetchBoards()
	}

	const handleDragEnd = async (result: DropResult) => {
		const { source, destination } = result
		if (!destination) {
			return
		}

		// Reorder the tasks within the board
		const updatedBoards = [...boards]
		const sourceBoardIndex = updatedBoards.findIndex(
			board => board.id === source.droppableId
		)
		const destinationBoardIndex = updatedBoards.findIndex(
			board => board.id === destination.droppableId
		)

		const [removed] = updatedBoards[sourceBoardIndex].tasks.splice(
			source.index,
			1
		)
		updatedBoards[destinationBoardIndex].tasks.splice(
			destination.index,
			0,
			removed
		)

		// Update the column_index for moved tasks
		const tasksToUpdate = updatedBoards
			.flatMap(board => board.tasks)
			.filter(
				task =>
					task.id === updatedBoards[destinationBoardIndex].id &&
					task.column_index >= destination.index
			)
		tasksToUpdate.forEach(task => {
			task.column_index += 1
		})

		// Save the updated boards and tasks to the database
		await supabase.from('boards').upsert(updatedBoards)
		await supabase.from('tasks').upsert(
			tasksToUpdate.map(({ id, column_index }) => ({
				id,
				column_index
			}))
		)

		setBoards(updatedBoards)
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable
				droppableId='kanban-board'
				type='COLUMN'
				direction='horizontal'
			>
				{provided => (
					<div
						className={styles.boardContainer}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{boards.map((board, index) => (
							<div key={board.id} className={styles.board}>
								<Board
									board={board}
									index={index}
									onDelete={handleDeleteBoard}
									handleCardAdded={handleCardAdded}
									fetchBoards={fetchBoards}
								/>
							</div>
						))}
						{provided.placeholder}
						<AddBoard onBoardAdded={handleBoardAdded} />
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default KanbanBoard
