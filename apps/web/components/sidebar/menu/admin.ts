import { SearchIcon, ServerCogIcon, ShieldUserIcon } from 'lucide-react'
import type { MenuType } from '.'
import type { LightMenuItemType } from '../light-nav-main'
import type { NavMainMenuType } from '../nav-main'

// Меню админа
const adminMenu: LightMenuItemType[] = [
  {
    url: '#',
    icon: SearchIcon,
    title: 'Поиск'
  }
]

const adminNav: NavMainMenuType = [
  {
    title: 'Статистика',
    items: [
      {
        url: '/admin',
        title: 'Сервер',
        icon: ServerCogIcon
      }
    ]
  }
]

const menu: MenuType = {
  path: '/admin',
  mode: {
    name: 'Админка',
    logo: ShieldUserIcon
  },
  hidden: true,
  topMenu: adminMenu,
  bottomMenu: adminNav
}

export default menu
