'use client'

import { NavUser } from '@/src/shared/ui/navigation/nav-user'
import { ModeSwitcher } from '@/src/shared/ui/navigation/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  //useSidebar,
  SidebarRail
} from '@/src/shared/ui/shadcn/sidebar'
import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

import { LogIn } from 'lucide-react'
import { useAuth } from '../../providers/auth-context'
import { LightNavMain } from '../navigation/light-nav-main'
import { menu } from '@/src/shared/lib/menu'
import { NavMain } from '../navigation/nav-main'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { content: auth } = useAuth()
  const path = usePathname()

  const modes = []
  const pathes = []

  for (const menuItem of menu) {
    if (menuItem.mode) {
      modes.push({
        ...menuItem.mode,
        path: menuItem.path,
        hidden: menuItem.hidden
      })
    }

    pathes.push(menuItem.path)
  }

  const activeMedia =
    pathes.findLast((v) => {
      return path.startsWith(`/${path.split('/')[1]}${v}`)
    }) ?? '/'
  let topMenu = menu[0].topMenu
  let bottomMenu = menu[0].bottomMenu

  for (const menuItem of menu) {
    if (activeMedia === menuItem.path) {
      topMenu = menuItem.topMenu
      bottomMenu = menuItem.bottomMenu
      break
    }
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <ModeSwitcher modes={modes} />
        <LightNavMain items={topMenu} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain config={bottomMenu} />
        {/* <NavMain items={navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {auth ? (
          <NavUser user={auth} />
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
