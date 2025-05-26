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
import { MediaType } from 'database/schemas/media_types'

function appendSlashIfNotEmpty(str?: string) {
  if (str) str = `${str}/`
  return str ?? ''
}

export function generatePublicMenu(
  mediaType?: MediaType
) {
  const generated: NavMainMenuType = [
    {
      title: 'Сообщество',
      items: [
        {
          icon: BookCopyIcon,
          title: 'Коллекции',
          url: `/${appendSlashIfNotEmpty(mediaType)}collections`
        },
        {
          icon: UsersIcon,
          url: '/users',
          title: 'Пользователи'
        },
        {
          url: `/${appendSlashIfNotEmpty(mediaType)}calendar`,
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
          url: `/${appendSlashIfNotEmpty(mediaType)}calendar`,
          title: 'Мой календарь'
        },
        {
          icon: SquareLibraryIcon,
          url: `/${appendSlashIfNotEmpty(mediaType)}collections/me`,
          title: 'Мои коллекции'
        },
        {
          icon: ListTodoIcon,
          title: 'Мои списки',
          url: `/${appendSlashIfNotEmpty(mediaType)}lists`
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
