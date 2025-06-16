import { Button } from '@/src/shared/ui/button'
import { MediaPoster } from '@/src/widgets/media/media-poster'
import { MediaInfoType } from '@/src/shared/types/web-types'
import React from 'react'
import { MediaInfoBlock } from './media-info-block'

type Props = {
  mediaInfo: MediaInfoType
  mediaListButton: React.ReactNode
}

export function DesktopSidebar({ mediaListButton, mediaInfo }: Props) {

  return (
    <div className='hidden md:flex flex-col gap-2 h-full sticky top-4 min-w-[250px] max-w-[250px]'>
      <MediaPoster mediaInfo={mediaInfo} />
      <div className='flex flex-col gap-2 max-w-[250px]'>
        {
          mediaInfo.meta?.homepage && <Button isPrimary>Смотреть</Button>
        }
        {mediaListButton}
      </div>
      <MediaInfoBlock mediaInfo={mediaInfo} orientation='vertical' />
    </div>
  )
}