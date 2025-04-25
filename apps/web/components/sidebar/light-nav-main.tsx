"use client"

import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"

import { LocaleLink } from "../../hooks/locale-link"
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
            className="transition-all duration-200"
            tooltip={{
              hidden: open,
              children: item.title
            }}
          >
            <LocaleLink href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </LocaleLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}