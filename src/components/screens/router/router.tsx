import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routerType } from 'src/types/router.types'

import screensData from './screens.data'
import Sidebar from '@sidebar/Sidebar';

const Router: FC = () => {
	const screensRoutes = screensData.map(
		({ path, element }: routerType, key) => (
			<Route path={path} element={element} key={key} />
		)
	)

	return (
		<div className='flex'>
			<Sidebar />
			<Routes>{screensRoutes}</Routes>
		</div>
	)
}

export default Router
