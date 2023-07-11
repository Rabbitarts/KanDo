import { supabase } from '@supabase-client/server'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import Avatar from './Avatar'
import styles from './Profile.module.scss'

const Profile: FC = () => {
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [avatar_url, setAvatarUrl] = useState<string>('')
	const [email, setEmail] = useState<string>('')

	useEffect(() => {
		getProfile()
	}, [])

	const getProfile = async () => {
		setLoading(true)

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
				if (user.email) {
					setEmail(user.email)
				}
			}
		}

		setLoading(false)
	}

	const updateProfile = async (event: any) => {
		event.preventDefault()

		setLoading(true)

		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user !== null) {
			const updates = {
				id: user.id,
				username,
				avatar_url,
				name,
				updated_at: new Date()
			}

			const { error } = await supabase.from('profiles').upsert(updates)
			if (error) {
				alert(error.message)
			}
		}

		setLoading(false)
	}

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	return (
		<div className={styles.profile}>
			<span className={styles.title}>Profile</span>
			<form onSubmit={updateProfile} className={styles.form}>
				<Avatar
					url={avatar_url}
					size={150}
					onUpload={(event: any, url: any) => {
						setAvatarUrl(url)
						updateProfile(event)
					}}
				/>
				<div className={styles.inputCon}>
					<label className={styles.label}>Email</label>
					<input
						type='text'
						value={email}
						className={styles.emailInput}
						disabled
					/>
				</div>
				<div className={styles.inputCon}>
					<label className={styles.label}>Name</label>
					<input
						type='text'
						required
						value={name ? name : username}
						className={styles.input}
						onChange={handleNameChange}
					/>
				</div>

				<div>
					<button className={styles.updateBtn} type='submit' disabled={loading}>
						{loading ? 'Loading ...' : 'Update'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Profile
