import { supabase } from '@supabase-client/server'
import { FC } from 'react'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import styles from './Sidebar.module.scss'

const LogoutButton: FC = () => {
	const navigate = useNavigate()

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()

		if (error) {
			console.error('Error signing out', error.message)
		} else {
			console.log('User signed out!')
			navigate('/Auth')
		}
	}

	return (
		<button className={styles.logout} onClick={handleLogout}>
			<TbLogout size={28} className={styles.logIcon} /> Logout
		</button>
	)
}

export default LogoutButton
