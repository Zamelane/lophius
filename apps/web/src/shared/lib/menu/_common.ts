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

function appendSlashIfNotEmpty(str?: string) {
  if (str) str = `/${str}`
  return str ?? ''
}

export function generatePublicMenu(
  mediaType?: 'video' | 'comics' | 'book' | 'music'
) {
  const generated: NavMainMenuType = [
    {
      title: 'Сообщество',
      items: [
        {
          icon: BookCopyIcon,
          title: 'Коллекции',
          url: `/collections${appendSlashIfNotEmpty(mediaType)}`
        },
        {
          icon: UsersIcon,
          url: '/users',
          title: 'Пользователи'
        },
        {
          url: `/calendar${appendSlashIfNotEmpty(mediaType)}`,
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
          url: `/calendar/me${appendSlashIfNotEmpty(mediaType)}`,
          title: 'Мой календарь'
        },
        {
          icon: SquareLibraryIcon,
          url: `/collections/me${appendSlashIfNotEmpty(mediaType)}`,
          title: 'Мои коллекции'
        },
        {
          icon: ListTodoIcon,
          title: 'Мои списки',
          url: `/lists/me${appendSlashIfNotEmpty(mediaType)}`
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
          url: `/subscriptions/collections${appendSlashIfNotEmpty(mediaType)}`
        }
      ]
    }
  ]

  return generated
}
