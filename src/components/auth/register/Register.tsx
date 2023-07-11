import { supabase } from '@supabase-client/server'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Register.module.scss'

const Register: FC = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [msg, setMsg] = useState('')

	const navigate = useNavigate()

	const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			setLoading(true)
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						username
					}
				}
			})

			if (error) {
				setMsg(error.message)
			} else {
				navigate('/Kanban')
			}
		} catch (error: any) {
			setMsg(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.register}>
			<p className={styles.title}>Create a new user account</p>
			{loading ? (
				<p>Registered...</p>
			) : (
				<form onSubmit={handleRegister} className={styles.form}>
					<div className={styles.inputCon}>
						<label htmlFor='text'>Username:</label>
						<input
							type='text'
							placeholder='Your name'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className={styles.input}
						/>
					</div>
					<div className={styles.inputCon}>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							placeholder='Your email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={styles.input}
						/>
					</div>
					<div className={styles.inputCon}>
						<label htmlFor='password'>Password:</label>
						<input
							type='password'
							placeholder='Your password'
							onChange={e => setPassword(e.target.value)}
							value={password}
							className={styles.input}
						/>
					</div>
					<button type='submit' className={styles.registerBtn}>
						Sign Up
					</button>
				</form>
			)}
			<p className={styles.msg}>{msg}</p>
		</div>
	)
}

export default Register
