'use client'

import type { GetTvDetailedInfoResult } from '@/actions/server/media/tv/get-tv-detailed-info'
import { CustomMenu, type Tab } from '@/components/me-ui/custom-menu'
import { CinemaInfoTab } from '@/components/template-components/media/page-info/tabs/info-tab'
import { useState } from 'react'

export type Info = {
  mediaInfo: GetTvDetailedInfoResult
}

export function FilmInfo({ mediaInfo }: Info) {
  const tabs: Tab[] = [
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
        setSelected={setSelectedTab}
      />
      <div className='flex flex-grow pt-2 max-w-full'>
        {selectedTab.id === 'info' && <CinemaInfoTab mediaInfo={mediaInfo} />}
      </div>
    </>
  )
}
