import { MediaPoster } from '@/src/widgets/media/media-poster'
import { GetTvDetailedInfoResult } from '@/src/features/media/pages/get-tv-detailed-info'

type Props = {
  posters: GetTvDetailedInfoResult['posters']
}

export function MobilePoster({ posters }: Props) {
  return (
    <div className='z-40 flex md:hidden justify-center mt-[-475px]'>
      <MediaPoster
        posters={posters}
        className='h-[350px] overflow-clip'
      />
    </div>
  )
}