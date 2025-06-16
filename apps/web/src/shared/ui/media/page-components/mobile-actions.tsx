import { MediaInfoType } from '@/src/shared/types/web-types'
import { Button } from '@/src/shared/ui/button'

type Props = {
  mediaListButton: React.ReactNode,
  mediaInfo: MediaInfoType
}

export function MobileActions({ mediaListButton, mediaInfo }: Props) {
  return (
    <div className='z-40 flex flex-col gap-2 md:hidden'>
      {
        mediaInfo.meta?.homepage && <Button isPrimary>Смотреть</Button>
      }
      {mediaListButton}
    </div>
  )
}