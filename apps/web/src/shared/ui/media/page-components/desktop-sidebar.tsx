import { MediaListButton } from '@/src/features/media-list-button'
import { Button } from '@/src/shared/ui/button'
import { MediaPoster } from '@/src/widgets/media/media-poster'
import { GetTvDetailedInfoResult } from '@/src/features/media/pages/get-tv-detailed-info'
import { MediaInfoBlock } from './media-info-block'

type Props = {
  mediaInfo: GetTvDetailedInfoResult
  id: number
}

export function DesktopSidebar({ mediaInfo, id }: Props) {

  return (
    <div className='hidden md:flex flex-col gap-2 h-full sticky top-4 min-w-[250px] max-w-[250px]'>
      <MediaPoster posters={mediaInfo.posters} />
      <div className='flex flex-col gap-2 max-w-[250px]'>
        <Button isPrimary>Смотреть</Button>
        <MediaListButton mediaId={id} />
      </div>
      <MediaInfoBlock mediaInfo={mediaInfo} orientation='vertical' />
    </div>
  )
}