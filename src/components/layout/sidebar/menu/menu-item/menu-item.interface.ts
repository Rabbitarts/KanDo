import { IconType } from 'react-icons'

export interface IMenuLink {
	name: string
	link: string
	icon: IconType
	isSpecial?: boolean
}
