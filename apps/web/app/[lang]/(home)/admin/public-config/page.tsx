'use client'

import { ListsView } from '@/src/features/settings/ui/view'
import { ListIcon } from 'lucide-react'
import {
  CustomMenu,
  MenuContent,
  type Tab
} from '../../../../../src/shared/ui/custom/custom-menu'

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
        <MenuContent id='lists'>
          <ListsView />
        </MenuContent>
      </CustomMenu>
    </div>
  )
}
