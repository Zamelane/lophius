'use client'

import { CustomMenu, MenuContent, Tab } from '../../../../../src/shared/ui/custom/custom-menu';
import { ListsView } from "@/views/list-configurations/view";
import { ListIcon } from "lucide-react";

export default function Page() {
  const tabs: Tab[] = [
    {
      id: 'lists',
      icon: ListIcon,
      title: 'Списки'
    }
  ]

  return (
    <div>
      <CustomMenu tabs={tabs}>

        <MenuContent id="lists">
          <ListsView />
        </MenuContent>

      </CustomMenu>
    </div>
  )
}