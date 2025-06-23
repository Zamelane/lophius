'use client'

import { MediaPoster } from '@/src/widgets/media/media-poster'
import { MediaInfoType } from '@/src/shared/types/web-types'

type Props = {
  mediaInfo: MediaInfoType
}

export function MobilePoster({ mediaInfo }: Props) {
  return (
    <div className='z-40 flex md:hidden justify-center mt-[-475px]'>
      <MediaPoster
        mediaInfo={mediaInfo}
        className='h-[350px] overflow-clip'
      />
    </div>
  )
}