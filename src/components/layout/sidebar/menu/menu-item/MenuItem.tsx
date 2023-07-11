import styles from '@sidebar/Sidebar.module.scss'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { IMenuLink } from './menu-item.interface'

interface IMenuItem {
	item: IMenuLink
}

const MenuItem: FC<IMenuItem> = ({ item }) => {
	const IconComponent = item.icon
	const location = useLocation()

	const isActive = location.pathname == item.link

	if (item.isSpecial) {
		return (
			<>
				<li>
					<Link
						to={item.link}
						className={`${styles.sideLink} ${isActive ? styles.active : ''}`}
					>
						<IconComponent className={styles.sideIcon} size={28} />
						{item.name}
					</Link>
				</li>
				<li className='mt-10'>
					<div className={styles.menuTitle}>TO-DO</div>
				</li>
			</>
		)
	}

	return (
		<li>
			<Link
				to={item.link}
				className={`${styles.sideLink} ${isActive ? styles.active : ''}`}
			>
				<IconComponent className={styles.sideIcon} size={28} />
				{item.name}
			</Link>
		</li>
	)
}

export default MenuItem
