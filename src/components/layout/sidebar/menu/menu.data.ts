import { BsViewList } from 'react-icons/bs'
import { HiOutlineHome, HiOutlineViewColumns } from 'react-icons/hi2'

import { IMenuLink } from './menu-item/menu-item.interface'

export const menu: IMenuLink[] = [
	{
		link: '/Home',
		name: 'Home',
		icon: HiOutlineHome,
		isSpecial: true
	},
	{
		link: '/Kanban',
		name: 'Kanban',
		icon: HiOutlineViewColumns
	},
	{
		link: '/List',
		name: 'List',
		icon: BsViewList
	}
]
