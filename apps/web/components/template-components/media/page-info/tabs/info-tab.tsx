import type { GetTvDetailedInfoResult } from '@/actions/server/media/tv/get-tv-detailed-info'
import { Tag } from '@/components/template-components/media/page-info/tags/tag'
import { TagContainer } from '@/components/template-components/media/page-info/tags/tag-container'
import { LocaleLink } from '@/hooks/locale-link'
import Image from 'next/image'

export type Props = {
  mediaInfo: GetTvDetailedInfoResult
}

export function CinemaInfoTab({ mediaInfo }: Props) {
  let mediaType = undefined

  switch (mediaInfo.mediaType) {
    case 'anime':
      mediaType = 'фильм'
      break
    case 'book':
      mediaType = 'фильм'
      break
    case 'comic':
      mediaType = 'фильм'
      break
    case 'kino':
      mediaType = 'фильм'
      break
    case 'music':
      mediaType = 'фильм'
      break
  }

  return (
    <div className='flex flex-col gap-4 pt-2 min-w-0 max-w-full'>
      <TagContainer>
        {mediaType && (
          <Tag
            accent
            text={mediaType}
            href={`/tv/catalog?type=${mediaInfo.mediaType}`}
          />
        )}
        <Tag text='комедия' href='/tv/catalog?genre=comedy' />
      </TagContainer>

      <div className='flex flex-col gap-2'>
        <h6 className='text-lg font-semibold'>Описание</h6>
        <p className='text-sm'>
          {mediaInfo.translates.overviews.length ? (
            mediaInfo.translates.overviews[0]
          ) : (
            <i>Без описания ...</i>
          )}
        </p>
      </div>

      <div className='flex flex-wrap gap-4'>
        <div className='flex flex-col gap-2'>
          <h6 className='text-lg font-semibold'>Телесеть</h6>
          <div className='flex flex-wrap gap-1'>
            <LocaleLink
              href='/tv-network/123'
              className='rounded-full inline-flex gap-1 items-center border transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium pr-1.5'
            >
              <Image
                alt='ATX'
                width={20}
                height={20}
                className='rounded-full w-[20px] h-[20px] border-secondary border-[1px] bg-background'
                src='https://media.themoviedb.org/t/p/h50_filter(negate,000,666)/fERjndErEpveJmQZccJbJDi93rj.png'
              />
              {' AT-X'}
            </LocaleLink>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h6 className='text-lg font-semibold'>Трекеры</h6>
          <div className='flex flex-wrap gap-1'>
            <LocaleLink
              href='/trackers/123'
              className='rounded-full inline-flex gap-1 items-center border transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium pr-1.5'
            >
              <Image
                alt='TMDB'
                width={20}
                height={20}
                className='rounded-full w-[20px] h-[20px] border-secondary border-[1px] bg-background'
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
              />
              {' TMDB'}
            </LocaleLink>
          </div>
        </div>
      </div>
    </div>
  )
}
