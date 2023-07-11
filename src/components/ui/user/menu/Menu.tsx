import { supabase } from '@supabase-client/server'
import { FC, useEffect, useState } from 'react'
import { HiArrowRightOnRectangle, HiOutlineUser } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

import styles from './Menu.module.scss'

const Menu: FC = () => {
	const [isRegistered, SetIsRegistered] = useState(false)

	useEffect(() => {
		const checkUserAuth = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			if (user) {
				SetIsRegistered(true)
			} else {
				SetIsRegistered(false)
			}
		}

		checkUserAuth()
	}, [])

	const renderMenu = () => {
		if (isRegistered) {
			return (
				<>
					<Link to='/Profile' className={styles.menuBtn}>
						My Profile <HiOutlineUser size={22} className={styles.icon} />
					</Link>
				</>
			)
		} else {
			return (
				<Link to='/Auth' className={styles.menuBtn}>
					Sign Up
					<HiArrowRightOnRectangle size={22} className={styles.icon} />
				</Link>
			)
		}
	}

	return <div className={styles.menu}>{renderMenu()}</div>
}

export default Menu
