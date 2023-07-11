import { ISubtask } from '@screens/kanban/kanban-board/card/subtask/subtask.interface'

export interface ICardData {
	id: string
	description: string
	tags: string[]
	subtasks: ISubtask[]
	column_index: number
}

export interface IBoardData {
	id: string
	title: string
	tasks: ICardData[]
	column_index: number
}
