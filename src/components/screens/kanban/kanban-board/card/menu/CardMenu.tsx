import { FC, FormEvent, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

import { tagColors } from '../tagColors'

import styles from './CardMenu.module.scss'
import { ICardMenu } from './card-menu.interface'
import { supabase } from '@/supabase/server'

const CardMenu: FC<ICardMenu> = ({
	card,
	onDelete,
	onClose,
	onAddTag,
	onDeleteTag,
	updateTasks,
	tags
}) => {
	const [taskText, setTaskText] = useState(card.description)
	const [newTag, setNewTag] = useState('')

	const OnSave = async (e: FormEvent) => {
		e.preventDefault()
		await supabase
			.from('tasks')
			.update({ description: taskText })
			.eq('id', card.id)

		updateTasks()
		onClose()
	}

	const handleAddTag = (event: FormEvent) => {
		event.preventDefault()
		if (newTag.trim() !== '') {
			onAddTag(newTag)
			setNewTag('')
		}
	}

	const handleDeleteTag = (tag: string) => {
		onDeleteTag(tag)
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h4 className={styles.title}>Card Details</h4>
					<button onClick={onClose} className={styles.close}>
						<HiXMark size={26} />
					</button>
				</div>
				<form className={styles.form} onSubmit={OnSave}>
					<textarea
						value={taskText}
						onChange={e => setTaskText(e.target.value)}
						className={styles.taskInput}
					/>
					<button type='submit' className={styles.save}>
						Save
					</button>
				</form>

				<div className={styles.tags}>
					{tags.map((tag, index) => (
						<div
							key={index}
							className={styles.tag}
							style={{
								backgroundColor: tagColors[tag] || '#DAF8E7'
							}}
						>
							<span>{tag}</span>
							<button
								className={styles.deleteTagBtn}
								onClick={() => handleDeleteTag(tag)}
							>
								<HiXMark size={16} />
							</button>
						</div>
					))}
				</div>

				<form className={styles.addTagContainer} onSubmit={handleAddTag}>
					<input
						type='text'
						placeholder='Add Tag'
						value={newTag}
						onChange={e => setNewTag(e.target.value)}
						className={styles.addTagInput}
					/>
					<button type='submit' className={styles.addTagBtn}>
						Add
					</button>
				</form>

				<button onClick={onDelete} className={styles.delete}>
					Delete card
				</button>
			</div>
		</div>
	)
}

export default CardMenu
