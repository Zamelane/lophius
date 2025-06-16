import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { MediaInfoType } from '@/src/shared/types/web-types'
import { Image } from '@/src/shared/ui/media/image'
import { SearchSlashIcon } from 'lucide-react'

export type Props = {
  mediaInfo: MediaInfoType
}

export function ActorsTab({ mediaInfo }: Props) {
  return (
    <div className='flex flex-col gap-4 pt-2 min-w-0 max-w-full'>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
        {mediaInfo?.meta?.actors?.map((actor, idx) => (
          <LocaleLink href={`/actors/${actor.id}`} key={idx} className='flex items-center gap-6'>
            {actor.profilePath ? (
              <Image
                alt={actor.name?.title || ''}
                src={`http${actor.profilePath.https ? 's' : ''}://${actor.profilePath.domain}${actor.profilePath.path}`}
                width={75}
                height={75}
                className='aspect-square object-cover rounded-md'
              />
            ) : (
              <div className='h-full flex justify-center items-center bg-border aspect-square object-cover rounded-md w-[75px]'>
                <SearchSlashIcon />
              </div>
            )}
            <div>
              <p className='font-bold'>{actor?.name?.title}</p>
              <p className='text-xs'>
                {typeof actor?.character === 'string'
                  ? actor.character
                  : actor.character?.name.title || <i>Персонаж неизвестен</i>}
              </p>
            </div>
          </LocaleLink>
        ))}
      </div>
    </div>
  );
}