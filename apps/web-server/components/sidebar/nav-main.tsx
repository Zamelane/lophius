"use client"

import { usePathname } from "next/navigation"
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
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu"
import Link from "next/link"

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
                <Collapsible asChild key={item.title} defaultOpen={path === item.url}>
                  <SidebarMenuItem>
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={path === item.url}>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        {item.menu?.map((subItem) => (
                          <Link href={subItem.url} key={subItem.title}>
                            <ContextMenuItem key={subItem.title}>
                              {subItem.title}
                              {
                                subItem.icon && 
                                  <ContextMenuShortcut>
                                    <subItem.icon size={16}/>
                                  </ContextMenuShortcut>
                              }
                            </ContextMenuItem>
                          </Link>
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
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    {subItem.icon && <subItem.icon/>}
                                    <span>{subItem.title}</span>
                                  </a>
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