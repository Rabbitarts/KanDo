import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

import styles from './BoardMenu.module.scss'
import { supabase } from '@/supabase/server'
import { IBoardData } from '@/types/board.types'

interface IBoardMenu {
	onClose: () => void
	onDelete: () => void
	board: IBoardData
	fetchTitle: () => void
}

const BoardMenu: FC<IBoardMenu> = ({
	onClose,
	onDelete,
	board,
	fetchTitle
}) => {
	const [boardName, setBoardName] = useState(board.title)

	const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBoardName(e.target.value)
	}

	const handleBoardNameSave = async (e: FormEvent) => {
		e.preventDefault()
		await supabase
			.from('boards')
			.update({ title: boardName })
			.eq('id', board.id)

		fetchTitle()
		onClose()
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h4 className={styles.title}>Board Menu</h4>
					<button onClick={onClose}>
						<HiXMark size={28} />
					</button>
				</div>
				<form className={styles.form} onSubmit={handleBoardNameSave}>
					<input
						type='text'
						placeholder='Title'
						className={styles.boardTitle}
						value={boardName}
						onChange={handleBoardNameChange}
					/>
					<button className={styles.save} type='submit'>
						Save
					</button>
				</form>
				<button onClick={onDelete} className={styles.delete}>
					Delete board
				</button>
			</div>
		</div>
	)
}

export default BoardMenu
