"use client"

import { type LucideIcon } from "lucide-react"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "../ui/sidebar"


export function LightNavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  const { open } = useSidebar()
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            tooltip={{
              children: item.title,
              hidden: open
            }}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}