'use client'

import { MediaInfoTab } from '@/src/widgets/media/page-info/tabs/info-tab'
import { useState } from 'react'
import { CustomMenu, MenuContent, type Tab } from '../../../shared/ui/custom/custom-menu'
import { MediaInfoType } from '@/src/shared/types/web-types'

export type Info = {
  mediaInfo: MediaInfoType
}

export function FilmInfo({ mediaInfo }: Info) {
  const tabs: Tab<string>[] = [
    {
      id: 'info',
      title: 'Информация'
    }
  ]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  return (
    <>
      <CustomMenu
        tabs={tabs}
        selected={selectedTab}
        setSelected={setSelectedTab}>
        <MenuContent id='info'>
          <MediaInfoTab mediaInfo={mediaInfo} />
        </MenuContent>
      </CustomMenu>
    </>
  )
}
