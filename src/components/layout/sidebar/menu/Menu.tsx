import { FC } from 'react'

import styles from '../Sidebar.module.scss'

import MenuItem from './menu-item/MenuItem'
import { menu } from './menu.data'

const Menu: FC = () => {
	return (
		<nav className={styles.menu}>
			<ul>
				{menu.map(item => (
					<MenuItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default Menu
