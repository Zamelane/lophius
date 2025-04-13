"use client"

import { usePathname } from "next/navigation"
import { LocaleLink } from "@/hooks/locale-link"
import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarGroup,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import { ContextMenu, ContextMenuItem, ContextMenuContent, ContextMenuTrigger, ContextMenuShortcut } from "../ui/context-menu"

export type NavMainMenuType = {
  title: string,
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
  config,
}: {
  config: NavMainMenuType
}) {
  const path = usePathname()
  return (
    <>
      {
        config.map((v, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{v.title}</SidebarGroupLabel>
            <SidebarMenu>
              {v.items.map((item) => (
                <Collapsible asChild key={'c_' + item.title} defaultOpen={path === item.url}>
                  <SidebarMenuItem>
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={path === item.url}>
                          <LocaleLink href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </LocaleLink>
                        </SidebarMenuButton>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        {item.menu?.map((subItem) => (
                          <LocaleLink href={subItem.url} key={'s_' + subItem.title}>
                            <ContextMenuItem key={'ss_' + subItem.title}>
                              <p className={subItem.icon ? "pr-2" : ""}>{subItem.title}</p>
                              {
                                subItem.icon && 
                                  <ContextMenuShortcut>
                                    <subItem.icon size={16}/>
                                  </ContextMenuShortcut>
                              }
                            </ContextMenuItem>
                          </LocaleLink>
                        ))}
                      </ContextMenuContent>
                    </ContextMenu>
                    {item.menu?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.menu?.map((subItem) => (
                              <SidebarMenuSubItem key={'sm_' + subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <LocaleLink href={subItem.url}>
                                    {subItem.icon && <subItem.icon/>}
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
        ))
      }
    </>
  )
}