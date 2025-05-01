'use client'

import type { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { LayoutProps } from '@/interfaces'
import { cn } from '@/lib/utils'
import { LocaleLink } from '../../hooks/locale-link'
import { useGlobalSearchContext } from '../template-components/global-search'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '../ui/sidebar'

const ModifyLocaleLink = (
  props: React.ComponentProps<typeof LocaleLink> & { action?: () => void }
) => {
  const { action, ...localeLinkProps } = props

  if (!props.href) {
    return (
      <div className={cn(props.className, 'cursor-pointer')} onClick={action}>
        {props.children}
      </div>
    )
  }

  return <LocaleLink {...localeLinkProps} />
}

const KBD = (
  props: LayoutProps & {
    kdb?: string
  }
) => {
  return props.kdb ? (
    <>
      {props.children}
      <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-auto'>
        <span className='text-xs'>⌘</span>
        {props.kdb}
      </kbd>
    </>
  ) : (
    props.children
  )
}

export type LightMenuItemType = {
  title: string
  url: string
  type?: 'search'
  kbd?: string
  icon: LucideIcon
  isActive?: boolean
}

export function LightNavMain({
  items
}: {
  items: LightMenuItemType[]
}) {
  const { open } = useSidebar()
  const path = usePathname()
  const { setIsOpen } = useGlobalSearchContext()

  function actionHandler(type?: 'search') {
    console.log(type)
    if (type === 'search') {
      setIsOpen(true)
    }
  }

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={path === item.url}
            className='transition-all duration-200'
            tooltip={{
              hidden: open,
              children: item.title
            }}
          >
            <ModifyLocaleLink
              href={item.url}
              action={() => actionHandler(item.type)}
            >
              <KBD kdb={item.kbd}>
                <item.icon />
                <span>{item.title}</span>
              </KBD>
            </ModifyLocaleLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
