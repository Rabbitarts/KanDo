import { ICardData } from '@/types/board.types'

export interface ICardMenu {
	card: ICardData
	onClose: () => void
	onDelete: () => void
	tags: string[]
	onAddTag: (tag: string) => void
	onDeleteTag: (tag: string) => void
	updateTasks: () => void
}
