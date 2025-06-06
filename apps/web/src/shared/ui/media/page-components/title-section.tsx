import { HeaderTitle } from '@/src/shared/ui/navigation/header-title'
import { RatingBadge } from '@/src/widgets/media/rating-badge'
import { GetTvDetailedInfoResult } from '@/src/features/media/pages/get-tv-detailed-info'

type Props = {
  mediaInfo: GetTvDetailedInfoResult
}

export function TitleSection({ mediaInfo }: Props) {
  return (
    <div className='z-40 flex justify-center md:justify-between items-start'>
      <div className='flex flex-col text-center md:text-start'>
        <HeaderTitle className='text-center md:text-start text-2xl font-semibold line-clamp-2'>
          {mediaInfo.translates.titles.length ? (
            mediaInfo.translates.titles[0]
          ) : (
            <i>[Без заголовка]</i>
          )}
        </HeaderTitle>
        <p className='text-center md:text-start text-sm text-secondary-foreground opacity-80 line-clamp-2'>
          {mediaInfo.translates.taglines.length ? (
            mediaInfo.translates.taglines[0]
          ) : (
            <i>Без tagline ...</i>
          )}
        </p>
      </div>
      <div className='hidden md:flex flex-col justify-end text-end'>
        <RatingBadge rating='9.73' votes='0 оценок' />
      </div>
    </div>
  )
}