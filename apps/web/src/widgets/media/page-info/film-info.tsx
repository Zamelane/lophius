'use client'

import type { GetTvDetailedInfoResult } from '@/src/features/media/pages/get-tv-detailed-info'
import { CinemaInfoTab } from '@/src/widgets/media/page-info/tabs/info-tab'
import { useState } from 'react'
import { CustomMenu, MenuContent, type Tab } from '../../../shared/ui/custom/custom-menu'

export type Info = {
  mediaInfo: GetTvDetailedInfoResult
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
          <CinemaInfoTab mediaInfo={mediaInfo} />
        </MenuContent>
      </CustomMenu>
    </>
  )
}
