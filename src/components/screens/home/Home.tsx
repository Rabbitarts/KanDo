import { FC } from 'react'
import { FaRegHandPointRight } from 'react-icons/fa'
import { LiaArrowDownSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

import styles from './Home.module.scss'

const Home: FC = () => {
	return (
		<div className={styles.home}>
			<h1 className={styles.title}>
				Welcome <span>to KanDo!</span>
			</h1>

			<div>
				<h2 className='text-xl mb-4'>
					Organize Your Tasks
					<span className='block my-3'>
						<LiaArrowDownSolid size={30} />
					</span>
				</h2>
				<p className='text-lg mb-4'>
					Efficiently manage and prioritize your tasks using our intuitive
					kanban board.
				</p>
				<span className='block my-3'>
					<LiaArrowDownSolid size={30} />
				</span>
			</div>

			<div>
				<Link
					to='/Kanban'
					className='bg-[#4FBE9F] flex items-center w-[45%] gap-2 rounded-lg px-4 py-2 text-white'
				>
					Welcome to your kanban board <FaRegHandPointRight size={22} />
				</Link>
			</div>
		</div>
	)
}

export default Home
