import { supabase } from '@supabase-client/server'
import { FC, useEffect, useState } from 'react'
import { HiOutlineChevronDown, HiUserCircle } from 'react-icons/hi2'

import styles from './User.module.scss'
import Menu from './menu/Menu'

const User: FC = () => {
	// const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState(null)
	const [avatar_url, setAvatarUrl] = useState(null)
	const [name, setName] = useState(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		getProfile()
	}, [])

	const getProfile = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user !== null) {
			const { data, error: profileError } = await supabase
				.from('profiles')
				.select('username, name, avatar_url')
				.eq('id', user.id)
				.single()

			if (profileError) {
				console.warn(profileError)
			} else {
				setUsername(data.username)
				setAvatarUrl(data.avatar_url)
				setName(data.name)
			}
		}
	}

	const openModal = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className={styles.profile}>
			{avatar_url ? (
				<img src={avatar_url} alt='Avatar' className={styles.avatar} />
			) : (
				<HiUserCircle size={50} className={styles.noImage} />
			)}
			<span className={styles.username}>{name ? name : username}</span>
			<HiOutlineChevronDown
				size={20}
				onClick={openModal}
				className={isMenuOpen ? styles.chevronUp : ''}
			/>
			{isMenuOpen && <Menu />}
		</div>
	)
}

export default User
