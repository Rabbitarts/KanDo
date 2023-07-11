import { supabase } from '@supabase-client/server'
import { FC, useEffect, useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'

import styles from './Profile.module.scss'

interface IAvatarProps {
	url: string
	size: number
	onUpload: (event: any, url: any) => void
}

const Avatar: FC<IAvatarProps> = ({ size, onUpload }) => {
	const [avatarUrl, setAvatarUrl] = useState<string>('')
	const [uploading, setUploading] = useState<boolean>(false)

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
				setAvatarUrl(data.avatar_url)
			}
		}
	}

	const uploadAvatar = async (event: any) => {
		try {
			setUploading(true)

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = event.target.files[0]
			const fileName = file.name
			const filePath = `${fileName}`

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, {
					cacheControl: '3600',
					upsert: true
				})

			if (uploadError) {
				throw uploadError
			}

			const { data: urlData } = await supabase.storage
				.from('avatars')
				.getPublicUrl(filePath)

			// if (error) {
			// 	throw error
			// }

			onUpload(event, urlData?.publicUrl)
		} catch (error) {
			alert(error)
		} finally {
			setUploading(false)
		}
	}

	return (
		<div className={styles.avatarCon}>
			{avatarUrl ? (
				<img
					src={avatarUrl}
					alt='Avatar'
					className={styles.avatar}
					style={{ height: size, width: size }}
				/>
			) : (
				<HiOutlineUserCircle
					className={styles.noImage}
					style={{ height: size, width: size }}
				/>
			)}
			<div style={{ width: size }}>
				<label className={styles.upload} htmlFor='single'>
					{uploading ? 'Uploading ...' : 'Upload'}
				</label>
				<input
					id='single'
					type='file'
					accept='image/*'
					onChange={uploadAvatar}
					disabled={uploading}
					className={styles.uploadInput}
				/>
			</div>
		</div>
	)
}

export default Avatar
