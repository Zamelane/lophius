"use client"

import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"

import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"


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
  const path = usePathname()
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={path === item.url}
            tooltip={{
              hidden: open,
              children: item.title
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