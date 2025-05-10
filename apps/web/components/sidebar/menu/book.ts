import { BookCopyIcon, HomeIcon, SearchIcon } from 'lucide-react'
import type { MenuType } from '.'
import type { LightMenuItemType } from '../light-nav-main'
import type { NavMainMenuType } from '../nav-main'
import { generatePublicMenu } from './_common'

const publicMenu: LightMenuItemType[] = [
  {
    url: '',
    icon: SearchIcon,
    title: 'Поиск',
    type: 'search',
    kbd: 'K'
  },
  {
    url: '/book',
    icon: HomeIcon,
    isActive: true,
    title: 'Главная'
  }
]

const publicNav: NavMainMenuType = [...generatePublicMenu('book')]

const menu: MenuType = {
  path: '/book',
  mode: {
    name: 'Книги',
    logo: BookCopyIcon
  },
  topMenu: publicMenu,
  bottomMenu: publicNav
}

export default menu
