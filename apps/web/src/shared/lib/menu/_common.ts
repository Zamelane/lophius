import {
  BookCopyIcon,
  CalendarDaysIcon,
  CalendarHeartIcon,
  GroupIcon,
  ListTodoIcon,
  PodcastIcon,
  SquareLibraryIcon,
  UsersIcon
} from 'lucide-react'
import type { NavMainMenuType } from '../../ui/navigation/nav-main'

export function generatePublicMenu() {
  const generated: NavMainMenuType = [
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
      items: [
        {
          icon: CalendarHeartIcon,
          url: `/calendar`,
          title: 'Мой календарь'
        },
        {
          icon: SquareLibraryIcon,
          url: `/collections/me`,
          title: 'Мои коллекции'
        },
        {
          icon: ListTodoIcon,
          title: 'Мои списки',
          url: `/lists`
        }
      ]
    },
    {
      title: 'Подписки',
      items: [
        {
          icon: PodcastIcon,
          url: '/subscriptions/users',
          title: 'Подписки на пользователей'
        },
        {
          icon: GroupIcon,
          title: 'Подписки на коллекции',
          url: `/subscriptions/collections`
        }
      ]
    }
  ]

  return generated
}
