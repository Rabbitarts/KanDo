import styles from './Kanban.module.scss'
import { FC } from 'react'

import User from '@/components/ui/user/User'

const KanbanHeader: FC = () => {
	return (
		<div className={styles.header}>
			<span className={styles.title}>Kanban</span>
			<User />
		</div>
	)
}

export default KanbanHeader
