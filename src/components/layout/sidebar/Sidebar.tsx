import { FC } from 'react'

import Logo from './Logo'
import LogoutButton from './LogoutButton'
import styles from './Sidebar.module.scss'
import Menu from './menu/Menu'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<Menu />
			<LogoutButton />
		</div>
	)
}

export default Sidebar
