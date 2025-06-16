'use client'

import { HeaderTitle } from '@/src/shared/ui/navigation/header-title'
import { RatingBadge } from '@/src/widgets/media/rating-badge'
import { MediaInfoType } from '@/src/shared/types/web-types'

type Props = {
  mediaInfo: MediaInfoType
}

export function TitleSection({ mediaInfo }: Props) {
  return (
    <div className='z-40 flex justify-center md:justify-between items-start'>
      <div className='flex flex-col text-center md:text-start'>
        <HeaderTitle className='text-center md:text-start text-2xl font-semibold line-clamp-2'>
          {mediaInfo.title ? (
            mediaInfo.title.text
          ) : (
            <i>[Без заголовка]</i>
          )}
        </HeaderTitle>
        <p className='text-center md:text-start text-sm text-secondary-foreground opacity-80 line-clamp-2'>
          {mediaInfo.tagline ? (
            mediaInfo.tagline.text
          ) : (
            <i>Без tagline ...</i>
          )}
        </p>
      </div>
      <div className='hidden md:flex flex-col justify-end text-end'>
        <RatingBadge rating={(mediaInfo.meta?.rating?.voteAverage || 0).toPrecision(3).toString()} votes={(mediaInfo.meta?.rating?.voteCount || 0) + ' оценок'} />
      </div>
    </div>
  )
}