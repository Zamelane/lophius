import { BookCopyIcon, CalendarDaysIcon, CalendarHeartIcon, HomeIcon, HouseIcon, SearchIcon, UsersIcon } from 'lucide-react'
import type { MenuType } from '.'
import type { LightMenuItemType } from '../../ui/navigation/light-nav-main'
import type { NavMainMenuType } from '../../ui/navigation/nav-main'

const publicMenu: LightMenuItemType[] = [
  {
    url: '',
    icon: SearchIcon,
    title: 'Поиск',
    type: 'search',
    kbd: 'K'
  },
  {
    url: '/',
    icon: HomeIcon,
    isActive: true,
    title: 'Главная'
  }
]

const publicNav: NavMainMenuType = [
  {
      title: 'Сообщество',
      items: [
        {
          icon: BookCopyIcon,
          title: 'Коллекции',
          url: `/collections`
        },
        {
          icon: UsersIcon,
          url: '/users',
          title: 'Пользователи'
        },
        {
          url: `/calendar`,
          icon: CalendarDaysIcon,
          title: 'Медийный календарь'
        }
      ]
    },
    {
      title: 'Моя библиотека',
      isAuthRequired: true,
      items: [
        {
          icon: CalendarHeartIcon,
          url: `/calendar`,
          title: 'Мой календарь'
        }
      ]
    },
]

const menu: MenuType = {
  path: '/',
  mode: {
    name: 'Домашняя',
    logo: HouseIcon
  },
  topMenu: publicMenu,
  bottomMenu: publicNav
}

export default menu
