import { FC, useState } from 'react'
import { GoCheckCircleFill } from 'react-icons/go'

import styles from './MagicLink.module.scss'
import { supabase } from '@/supabase/server'

const MagicLink: FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [msg, setMsg] = useState<string>('')

	const MagicLink = async (event: any) => {
		event.preventDefault()

		try {
			setLoading(true)
			const { error } = await supabase.auth.signInWithOtp({ email })

			if (error) {
				setMsg(error.message)
			} else {
				setMsg('Check your emails now!')
			}
		} catch (error: any) {
			setMsg(error.error_description || error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<p className={styles.description}>
				Sign in via magic link with your email below
			</p>
			{loading ? (
				<span className={styles.loading}>
					<GoCheckCircleFill size={22} className={styles.loadIcon} /> Sending magic Link...
				</span>
			) : (
				<form onSubmit={MagicLink} className={styles.form}>
					<label htmlFor='email'>Email:</label>
					<input
						className={styles.input}
						type='email'
						placeholder='Your email'
						value={email}
						required
						onChange={e => setEmail(e.target.value)}
					/>
					<button type='submit' className={styles.send}>
						Get Magic Link
					</button>
				</form>
			)}
			<p className={styles.message}> {msg}</p>
		</div>
	)
}

export default MagicLink
