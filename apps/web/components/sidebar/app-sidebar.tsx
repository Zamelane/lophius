'use client'

import { NavUser } from '@/components/sidebar/nav-user'
import { ModeSwitcher } from '@/components/sidebar/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  //useSidebar,
  SidebarRail
} from '@/components/ui/sidebar'
import { LocaleLink } from '@/hooks/locale-link'
import {
  Book,
  BookCopy,
  CalendarDays,
  CalendarHeart,
  Cat,
  Clapperboard,
  Group,
  Home,
  ListTodo,
  LogIn,
  MusicIcon,
  NotebookText,
  Podcast,
  Search,
  ServerCog,
  ShieldUser,
  Sparkles,
  SquareLibrary,
  TvMinimal,
  Users
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

import { useAuth } from '../helps/auth-context'
import { type LightMenuItemType, LightNavMain } from './light-nav-main'
import { NavMain, type NavMainMenuType } from './nav-main'

const modes = [
  {
    path: '/',
    logo: TvMinimal,
    name: 'Приложение'
  },
  {
    path: '/admin',
    name: 'Админка',
    logo: ShieldUser
  }
]

const adminMenu = [
  {
    url: '#',
    icon: Search,
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
        icon: ServerCog
      }
    ]
  }
]

const publicMenu: LightMenuItemType[] = [
  {
    url: '',
    icon: Search,
    title: 'Поиск',
    type: 'search',
    kbd: 'K'
  },
  {
    url: '/',
    icon: Home,
    isActive: true,
    title: 'Домашняя'
  }
]

const publicNav: NavMainMenuType = [
  {
    title: 'Наша база',
    items: [
      {
        url: '/tv',
        title: 'Фильмы',
        icon: Clapperboard,
        menu: [
          {
            icon: Sparkles,
            url: '/tv/catalog',
            title: 'Каталог фильмов'
          },
          {
            url: '/2',
            icon: Sparkles,
            title: 'Каталог 2'
          }
        ]
      },
      {
        icon: Cat,
        url: '/anime',
        title: 'Аниме',
        menu: [
          {
            url: '/',
            title: 'Каталог'
          }
        ]
      },
      {
        url: '/comic',
        title: 'Манхва',
        icon: NotebookText,
        menu: [
          {
            url: '/',
            title: 'Каталог'
          }
        ]
      },
      {
        icon: Book,
        url: '/book',
        title: 'Книги',
        menu: [
          {
            url: '/',
            title: 'Каталог'
          }
        ]
      },
      {
        url: '/music',
        icon: MusicIcon,
        title: 'Музыка',
        menu: [
          {
            url: '/',
            title: 'Каталог'
          }
        ]
      }
    ]
  },
  {
    title: 'Сообщество',
    items: [
      {
        icon: BookCopy,
        title: 'Коллекции',
        url: '/collections'
      },
      {
        icon: Users,
        url: '/users',
        title: 'Пользователи'
      },
      {
        url: '/calendar',
        icon: CalendarDays,
        title: 'Медийный календарь'
      }
    ]
  },
  {
    title: 'Моя библиотека',
    items: [
      {
        icon: CalendarHeart,
        url: '/calendar/me',
        title: 'Мой календарь'
      },
      {
        icon: SquareLibrary,
        url: '/collections/me',
        title: 'Мои коллекции'
      },
      {
        icon: ListTodo,
        title: 'Мои списки',
        url: '/collections/me'
      }
    ]
  },
  {
    title: 'Подписки',
    items: [
      {
        icon: Podcast,
        url: '/subscriptions/users',
        title: 'Подписки на пользователей'
      },
      {
        icon: Group,
        title: 'Подписки на коллекции',
        url: '/subscriptions/collections'
      }
    ]
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { content: auth } = useAuth()
  const path = usePathname()

  const activeMedia =
    ['/admin'].find((v) => path.startsWith(`/${path.split('/')[1]}${v}`)) ?? '/'
  let navMain = publicNav
  let lightMenu = publicMenu

  switch (activeMedia) {
    case '/admin':
      navMain = adminNav
      lightMenu = adminMenu
      break
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <ModeSwitcher path={path} teams={modes} />
        <LightNavMain items={lightMenu} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain config={navMain} />
        {/* <NavMain items={navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {auth ? (
          <NavUser
            user={{
              id: auth.id,
              email: auth.email!,
              name: auth.nickname,
              avatarId: auth.avatarId
            }}
          />
        ) : (
          <LocaleLink href='/login'>
            <SidebarMenuButton className='w-full bg-primary text-primary-foreground transition-all duration-200'>
              <LogIn />
              <span className='text-center w-full'>Войти</span>
              <LogIn className='opacity-0' /> {/* Костыль :))) */}
            </SidebarMenuButton>
          </LocaleLink>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
