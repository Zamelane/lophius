'use client'

import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { Image } from '@/src/shared/ui/media/image'

export type VideoItemCardProps = {
  id: number
  img?: {
    domain: string
    path: string
    https: boolean
  }
  title: string
  date?: string
  type?: 'film' | 'episode' | 'chapter'
}

export function VideoCard({ id, title }: VideoItemCardProps) {
  return (
    <div className='flex border-[1px] gap-3 rounded-sm min-w-0 w-full max-w-full'>
      <Image
        link={`/media/${id}`}
        className='aspect-[5/7] pointer-events-none object-cover min-w-[85px] w-[85px] rounded-sm'
        src='http://image.tmdb.org/t/p/original/rtmmvqkIC5zDMEd638Es2woxbz8.jpg'
        alt='Постер'
        width='100'
        height='200'
      />
      <div className='flex flex-col gap-1 justify-center py-2'>
        <p className='text-xs opacity-80'>3 дня назад</p>
        <LocaleLink
          href={`/media/${id}`}
          className='text-sm line-clamp-2 hover:underline'
        >
          {title}
        </LocaleLink>
        <p className='text-xs opacity-80'>Фильм</p>
      </div>
    </div>
  )
}
