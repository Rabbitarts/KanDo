import { FC } from 'react'

import styles from './Kanban.module.scss'
import KanbanHeader from './KanbanHeader'
import KanbanBoard from './kanban-board/KanbanBoard'

const Kanban: FC = () => {
	return (
		<div className={styles.kanban}>
			<KanbanHeader />
			<KanbanBoard />
		</div>
	)
}

export default Kanban