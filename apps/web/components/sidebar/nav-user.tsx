'use client'

import { UserLogout } from '@/actions/client/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { LocaleLink } from '@/hooks/locale-link'
import { ChevronsUpDown, LogOut } from 'lucide-react'

export function NavUser({
  user
}: {
  user: {
    id: number
    name: string
    email: string
    avatarId?: number | null
  }
}) {
  const { isMobile } = useSidebar()
  const fallback = user.name.substring(0, 2).toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  alt={user.name}
                  src={user.avatarId ? `/api/assets/id/${user.avatarId}` : ''}
                />
                <AvatarFallback className='rounded-lg'>
                  {fallback}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
          >
            <LocaleLink href={`/user/${user.name}`}>
              <DropdownMenuItem className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      alt={user.name}
                      src={
                        user.avatarId ? `/api/assets/id/${user.avatarId}` : ''
                      }
                    />
                    <AvatarFallback className='rounded-lg'>
                      {fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user.name}</span>
                    <span className='truncate text-xs'>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </LocaleLink>
            {/*<DropdownMenuSeparator />*/}
            {/*<DropdownMenuGroup>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <Sparkles />*/}
            {/*    My profile*/}
            {/*  </DropdownMenuItem>*/}
            {/*</DropdownMenuGroup>*/}
            {/*<DropdownMenuSeparator />*/}
            {/*<DropdownMenuGroup>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <BadgeCheck />*/}
            {/*    Account*/}
            {/*  </DropdownMenuItem>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <CreditCard />*/}
            {/*    Billing*/}
            {/*  </DropdownMenuItem>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <Bell />*/}
            {/*    Notifications*/}
            {/*  </DropdownMenuItem>*/}
            {/*</DropdownMenuGroup>*/}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={UserLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
