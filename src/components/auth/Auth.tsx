import { supabase } from '@supabase-client/server'
import { FC, useState } from 'react'
import { FiGithub } from 'react-icons/fi'
import { HiOutlineArrowSmallRight } from 'react-icons/hi2'

import styles from './Auth.module.scss'
import MagicLink from './magic-link/MagicLink'
import Register from './register/Register'

const Auth: FC = () => {
	const [msg, setMsg] = useState('')

	const handleGitHubLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: 'https://kando.onrender.com/Kanban'
				}
			})

			if (error) {
				setMsg(error.message)
			}
		} catch (error: any) {
			setMsg(error)
		}
	}

	const [showRegister, setShowRegister] = useState(false)

	const toggleRegister = () => {
		setShowRegister(!showRegister)
	}

	return (
		<div className={styles.auth}>
			<div>
				<h1 className={styles.title}>Auth</h1>
				{showRegister ? <Register /> : <MagicLink />}
				<p className={styles.message}>{msg}</p>

				<div className={styles.btnCon}>
					<button onClick={handleGitHubLogin} className={styles.github}>
						<FiGithub size={20} /> Sign with GitHub
					</button>
					<button onClick={toggleRegister} className={styles.ToRegister}>
						{showRegister ? (
							'Back to Login'
						) : (
							<span className={styles.signUp}>
								Sing Up
								<HiOutlineArrowSmallRight size={22} />
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Auth
