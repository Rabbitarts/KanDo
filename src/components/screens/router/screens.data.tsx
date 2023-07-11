import { routerType } from 'src/types/router.types'

import Auth from '@/components/auth/Auth'

import Home from '../home/Home'
import Kanban from '../kanban/Kanban'
import Profile from '../profile/Profile'
import List from '../todo/Todos'

const screensData: routerType[] = [
	{
		path: '/Home',
		element: <Home />
	},
	{
		path: '/Kanban',
		element: <Kanban />
	},
	{
		path: '/List',
		element: <List />
	},
	{
		path: '/Auth',
		element: <Auth />
	},
	{
		path: '/Profile',
		element: <Profile />
	}
]

export default screensData
