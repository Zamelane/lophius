'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/src/shared/ui/shadcn/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/src/shared/ui/shadcn/sidebar'
import { cn } from '@/src/shared/lib/utils'
import { ChevronsUpDown } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'

type team = {
  name: string
  logo: React.ElementType
  path: string
  hidden?: boolean
}

export function ModeSwitcher({
  modes: mode
}: {
  modes: team[]
}) {
  const [open, setOpen] = useState(false)
  const { isMobile } = useSidebar()
  const path = usePathname()

  function getActiveTeam() {
    return (
      mode.findLast((v) =>
        path.startsWith(`/${path.split('/')[1]}${v.path}`)
      ) ?? mode[0]
    )
  }

  const [activeTeam, setVisibleActiveMode] = React.useState(getActiveTeam())

  if (!activeTeam) {
    return null
  }

  React.useEffect(() => setVisibleActiveMode(getActiveTeam()), [path])

  function setActiveMode(value: team) {
    setVisibleActiveMode(value)
    setOpen(false)
    redirect(value.path)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <activeTeam.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Lophius</span>
                <span className='truncate text-xs'>{activeTeam.name}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Разделы медиа
            </DropdownMenuLabel>
            {mode.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                className={cn('gap-2 p-2', team.hidden && 'hidden')}
                onClick={() => setActiveMode(team)}
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
