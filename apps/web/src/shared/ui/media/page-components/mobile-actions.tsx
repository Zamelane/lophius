import { Button } from '@/src/shared/ui/button'

type Props = {
  mediaListButton: React.ReactNode
}

export function MobileActions({ mediaListButton }: Props) {
  return (
    <div className='z-40 flex flex-col gap-2 md:hidden'>
      <Button isPrimary>Смотреть</Button>
      {mediaListButton}
    </div>
  )
}