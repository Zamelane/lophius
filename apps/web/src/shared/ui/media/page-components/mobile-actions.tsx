import { MediaListButton } from '@/src/features/media-list-button'
import { Button } from '@/src/shared/ui/button'

type Props = {
  id: number
}

export function MobileActions({ id }: Props) {
  return (
    <div className='z-40 flex flex-col gap-2 md:hidden'>
      <Button isPrimary>Смотреть</Button>
      <MediaListButton mediaId={id} />
    </div>
  )
}