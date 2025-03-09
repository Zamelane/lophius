"use client"

import Link from "next/link";
import * as React from "react"
import {useAuth} from "@/components/auth-context";
import {Button} from "@/components/shadcn/ui/button";
import { NavMain } from "@/components/shadcn/nav-main"
import { NavUser } from "@/components/shadcn/nav-user"
import { NavProjects } from "@/components/shadcn/nav-projects"
import { NavSecondary } from "@/components/shadcn/nav-secondary"
import {
  Map,
  Send,
  Frame,
  Command,
  LifeBuoy,
  PieChart,
  Popcorn,
  Clapperboard,
  GalleryVerticalEnd,
  Library,
  Music,
} from "lucide-react"
import {
  Sidebar,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/shadcn/ui/sidebar"

const data = {
  medias: [
    {
      icon: Popcorn,
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
      title: "Кино",
      url: "#",
    },
    {
      icon: Clapperboard,
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
      title: "Аниме",
      url: "#",
    },
    {
      icon: GalleryVerticalEnd,
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
      title: "Комиксы",
      url: "#",
    },
    {
      icon: Library,
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
      title: "Книги",
      url: "#",
    },
    {
      icon: Music,
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
      title: "Музыка",
      url: "#",
    },
  ],
  navSecondary: [
    {
      icon: LifeBuoy,
      title: "Помощь",
      url: "#",
    },
    {
      icon: Send,
      title: "Обратная связь",
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

export function DefaultAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { content: auth } = useAuth()
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Lophius</span>
                  <span className="truncate text-xs">Media collection service</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Медиа" items={data.medias} />
        <NavProjects projects={data.projects} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
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
                <Button className="w-full">Войти</Button>
              </Link>
        }
      </SidebarFooter>
    </Sidebar>
  )
}
