'use client'

import { MediaInfoTab } from '@/src/widgets/media/page-info/tabs/info-tab'
import { useState } from 'react'
import { CustomMenu, MenuContent, type Tab } from '../../../shared/ui/custom/custom-menu'
import { MediaInfoType } from '@/src/shared/types/web-types'
import { ActorsTab } from './tabs/actors-tab'

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

  if (mediaInfo.meta?.actors?.length || 0 > 0) {
    tabs.push({
      id: 'actors',
      title: 'Актеры',
      badge: mediaInfo.meta?.actors?.length
    })
  }
  
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
        <MenuContent id='actors'>
          <ActorsTab mediaInfo={mediaInfo} />
        </MenuContent>
      </CustomMenu>
    </>
  )
}
