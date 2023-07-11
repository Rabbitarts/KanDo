import { FC, useEffect, useState } from 'react'

import styles from './CardCount.module.scss'
import { supabase } from '@/supabase/server'

interface ICardCount {
	boardId: string
}

const CardCount: FC<ICardCount> = ({ boardId }) => {
	const [amount, setAmount] = useState(0)

	useEffect(() => {
		fetchCardCount()
	}, [])

	const fetchCardCount = async () => {
		try {
			const { data, error } = await supabase
				.from('tasks')
				.select('count', { count: 'exact' })
				.eq('board_id', boardId)

			if (error) {
				console.error('Error fetching card count:', error)
				return
			}

			const totalCount = data[0]?.count || 0
			setAmount(totalCount)
		} catch (error) {
			console.error('Error fetching card count:', error)
		}
	}

	return <span className={styles.amount}>{amount}</span>
}

export default CardCount
