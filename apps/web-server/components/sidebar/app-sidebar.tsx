"use client"

import Link from "next/link"
import * as React from "react"
import { mediaPaths } from "@/interfaces"
import { usePathname } from "next/navigation"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  //useSidebar,
  SidebarRail,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  Cat,
  Home,
  Book,
  Music,
  LogIn,
  Users,
  Search,
  Library,
  Popcorn,
  Combine,
  History,
  Sparkles,
  MusicIcon,
  LayoutList,
  LibraryBig,
  Clapperboard,
  NotebookText,
  GalleryVerticalEnd,
} from "lucide-react"

import { useAuth } from "../helps/auth-context"
import { LightNavMain } from "./light-nav-main"

const mainMenu = [
  {
    url: "#",
    icon: Search,
    title: "Поиск",
  },
  {
    url: "#",
    icon: Home,
    isActive: true,
    title: "Домашняя"
  }
]

const medias = [
  {
    path: '/',
    logo: Combine,
    name: "Все медиа"
  },
  {
    logo: Popcorn,
    path: '/kino',
    name: "Фильмы и сериалы"
  },
  {
    name: "Аниме",
    path: '/anime',
    logo: Clapperboard
  },
  {
    path: '/comic',
    name: "Комиксы",
    logo: GalleryVerticalEnd
  },
  {
    logo: Library,
    name: "Книги",
    path: '/book'
  },
  {
    logo: Music,
    name: "Музыка",
    path: '/music'
  },
]

// const kinoNavMain = [
//   {
//     icon: Clapperboard,
//     isActive: true,
//     items: [
//       {
//         title: "Вся библиотека",
//         url: "#",
//       },
//       {
//         title: "Starred",
//         url: "#",
//       },
//       {
//         title: "Settings",
//         url: "#",
//       },
//     ],
//     title: "Каталог",
//     url: "#",
//   }
// ]

const publicNavMain = [
  {
    title: "Сообщество",
    menu: [
      {
        url: "#",
        icon: Users,
        isActive: false,
        title: "Пользователи",
      },
      {
        url: "#",
        isActive: false,
        icon: LibraryBig,
        title: "Публичные коллекции",
      }
    ]
  }
]

const kinoNavMain = [
  {
    title: "Наша база",
    menu: [
      {
        url: "#",
        icon: Sparkles,
        isActive: false,
        title: "Новинки",
      },
      {
        url: "#",
        isActive: false,
        icon: LayoutList,
        title: "Каталог",
      },
      {
        url: "#",
        icon: History,
        isActive: false,
        title: "Недавно обновлённые",
      }
    ]
  },
  ...publicNavMain
]

const navMain1 = [
  {
    title: "Наша база",
    menu: [
      {
        url: "#",
        isActive: false,
        icon: Clapperboard,
        title: "Фильмы и сериалы",
      },
      {
        url: "#",
        icon: Cat,
        title: "Аниме",
        isActive: false,
      },
      {
        url: "#",
        isActive: false,
        title: "Комиксы",
        icon: NotebookText,
      },
      {
        url: "#",
        icon: Book,
        title: "Книги",
        isActive: false,
      },
      {
        url: "#",
        icon: MusicIcon,
        isActive: false,
        title: "Музыка",
      },
    ]
  },
  ...publicNavMain
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { content: auth } = useAuth()
  const path = usePathname()

  const activeMedia = mediaPaths.find(v => path.startsWith(v)) ?? "/"
  let navMain = navMain1

  switch (activeMedia) {
    case '/kino':
      navMain = kinoNavMain
      break;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher path={path} teams={medias} />
        <LightNavMain items={mainMenu} />
      </SidebarHeader>
      <SidebarContent>
        {
          navMain.map((v, i) => (
            <SidebarGroup key={i}>
              <SidebarGroupLabel>{v.title}</SidebarGroupLabel>
              <LightNavMain items={v.menu} />
            </SidebarGroup>
          ))
        }
        {/* <NavMain items={navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
      {
          auth ?
            <NavUser
              user={{
                avatar: '',
                email: auth.email,
                name: auth.nickname
              }}
            />
            : <Link href='/login'>
                <SidebarMenuButton className="w-full bg-primary text-primary-foreground">
                  <LogIn/>
                  <span className="text-center w-full">Войти</span>
                  <LogIn className="opacity-0"/> {/* Костыль :))) */}
                </SidebarMenuButton>
              </Link>
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
