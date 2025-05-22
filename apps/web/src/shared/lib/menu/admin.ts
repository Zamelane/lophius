import { /*SearchIcon,*/ ListIcon, ServerCogIcon, ShieldUserIcon } from 'lucide-react'
import type { MenuType } from '.'
import type { LightMenuItemType } from '../../ui/navigation/light-nav-main'
import type { NavMainMenuType } from '../../ui/navigation/nav-main'

// Меню админа
const adminMenu: LightMenuItemType[] = [
  // {
  //   url: '#',
  //   icon: SearchIcon,
  //   title: 'Поиск'
  // }
]

const adminNav: NavMainMenuType = [
  {
    title: 'Общее',
    items: [
      {
        url: '/admin',
        title: 'Статистика',
        icon: ServerCogIcon
      }
    ]
  },
  {
    title: 'Конфигурация',
    items: [
      {
        url: '/admin/public-config',
        title: 'Общие настройки',
        icon: ListIcon
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
