'use client'

import { ListsSettingsView } from "@/src/features/settings/views/lists";
import { NotificationsSettingsView } from "@/src/features/settings/views/notifications";
import { CustomMenu, MenuContent, Tab } from "@/src/shared/ui/custom/custom-menu";
import { BellIcon, ListIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams()
  const selectedTab = searchParams?.get('tab')

  const tabs: Tab[] = [
    {
      id: 'lists',
      icon: ListIcon,
      title: 'Списки'
    },
    {
      id: 'notifications',
      icon: BellIcon,
      title: 'Уведомления'
    }
  ]

  function handleTabChange(id: string) {
    const params = new URLSearchParams(searchParams ?? "")
    params.set('tab', id)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)
  }

  return (
    <CustomMenu tabs={tabs} selectedId={selectedTab} tabChange={handleTabChange}>
      <MenuContent id='lists'>
        <ListsSettingsView />
      </MenuContent>
      <MenuContent id='notifications'>
        <NotificationsSettingsView />
      </MenuContent>
    </CustomMenu>
  )
}
