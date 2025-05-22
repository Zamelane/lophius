'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/shared/ui/shadcn/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/src/shared/ui/shadcn/sidebar'
import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from '../shadcn/context-menu'

export type NavMainMenuType = {
  title: string
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    menu?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}[]

export function NavMain({
  config
}: {
  config: NavMainMenuType
}) {
  const path = usePathname()
  return (
    <>
      {config.map((v, i) => (
        <SidebarGroup key={i}>
          <SidebarGroupLabel>{v.title}</SidebarGroupLabel>
          <SidebarMenu>
            {v.items.map((item) => (
              <Collapsible
                asChild
                key={`c_${item.title}`}
                defaultOpen={path === item.url}
              >
                <SidebarMenuItem>
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={path === item.url}
                        className='transition-all duration-200'
                      >
                        <LocaleLink href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </LocaleLink>
                      </SidebarMenuButton>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      {item.menu?.map((subItem) => (
                        <LocaleLink
                          href={subItem.url}
                          key={`s_${subItem.title}`}
                        >
                          <ContextMenuItem
                            key={`ss_${subItem.title}`}
                            className='transition-all duration-200'
                          >
                            <p className={subItem.icon ? 'pr-2' : ''}>
                              {subItem.title}
                            </p>
                            {subItem.icon && (
                              <ContextMenuShortcut>
                                <subItem.icon size={16} />
                              </ContextMenuShortcut>
                            )}
                          </ContextMenuItem>
                        </LocaleLink>
                      ))}
                    </ContextMenuContent>
                  </ContextMenu>
                  {item.menu?.length ? (
                    <>
                      <CollapsibleTrigger
                        asChild
                        className='transition-all duration-200'
                      >
                        <SidebarMenuAction className='data-[state=open]:rotate-90'>
                          <ChevronRight />
                          <span className='sr-only'>Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.menu?.map((subItem) => (
                            <SidebarMenuSubItem key={`sm_${subItem.title}`}>
                              <SidebarMenuSubButton
                                asChild
                                className='transition-all duration-200'
                              >
                                <LocaleLink href={subItem.url}>
                                  {subItem.icon && <subItem.icon />}
                                  <span>{subItem.title}</span>
                                </LocaleLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
