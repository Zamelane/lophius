"use client"

import * as React from "react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Bot,
  Map,
  Frame,
  Command,
  BookOpen,
  PieChart,
  Settings2,
  AudioWaveform,
  SquareTerminal,
  GalleryVerticalEnd,
  Music,
  Library,
  Clapperboard,
  Popcorn,
  Film,
  LogIn,
  Combine,
} from "lucide-react"
import { useAuth } from "../helps/auth-context"
import Link from "next/link"
import { Button } from "../ui/button"

// This is sample data.
const data = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
      title: "Playground",
      url: "#",
    },
    {
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
      title: "Models",
      url: "#",
    },
    {
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
      title: "Documentation",
      url: "#",
    },
    {
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
      title: "Settings",
      url: "#",
    },
  ],
  projects: [
    {
      icon: Frame,
      name: "Design Engineering",
      url: "#",
    },
    {
      icon: PieChart,
      name: "Sales & Marketing",
      url: "#",
    },
    {
      icon: Map,
      name: "Travel",
      url: "#",
    },
  ],
  user: {
    avatar: "/avatars/shadcn.jpg",
    email: "m@example.com",
    name: "shadcn",
  },
}

const teams = [
  {
    name: "Все медиа",
    logo: Combine
  },
  {
    name: "Фильмы и сериалы",
    logo: Popcorn
  },
  {
    name: "Аниме",
    logo: Clapperboard
  },
  {
    name: "Комиксы",
    logo: GalleryVerticalEnd
  },
  {
    name: "Книги",
    logo: Library
  },
  {
    name: "Музыка",
    logo: Music
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { content: auth } = useAuth()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
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
                <SidebarMenuButton className="w-full">
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
