import { HomeIcon, LibraryIcon, SearchIcon } from 'lucide-react'
import type { MenuType } from '.'
import type { LightMenuItemType } from '../../ui/navigation/light-nav-main'
import type { NavMainMenuType } from '../../ui/navigation/nav-main'
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
    url: '/comics',
    icon: HomeIcon,
    isActive: true,
    title: 'Главная'
  }
]

const publicNav: NavMainMenuType = [...generatePublicMenu('comics')]

const menu: MenuType = {
  path: '/comics',
  mode: {
    name: 'Комиксы',
    logo: LibraryIcon
  },
  topMenu: publicMenu,
  bottomMenu: publicNav
}

export default menu
