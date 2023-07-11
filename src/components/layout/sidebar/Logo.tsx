import logo from '@image/logo.svg'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Sidebar.module.scss'

const Logo: FC = () => {
	return (
		<Link to='/'>
			<img src={logo} alt='KanDo' width={150} className={styles.logo} />
		</Link>
	)
}

export default Logo
