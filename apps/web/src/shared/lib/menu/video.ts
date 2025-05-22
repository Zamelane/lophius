import { FilmIcon, HomeIcon, SearchIcon } from 'lucide-react'
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
    url: '/video',
    icon: HomeIcon,
    isActive: true,
    title: 'Главная'
  }
]

const publicNav: NavMainMenuType = [...generatePublicMenu('video')]

const menu: MenuType = {
  path: '/video',
  mode: {
    name: 'Видео',
    logo: FilmIcon
  },
  topMenu: publicMenu,
  bottomMenu: publicNav
}

export default menu
