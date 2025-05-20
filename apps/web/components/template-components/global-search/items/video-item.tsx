import { VideoType } from '@/actions/server/media/other/search';
import { Image } from '@/components/me-ui/image';
import { CommandItem } from '@/components/shadcn/ui/command';
import { LocaleLink } from '@/hooks/locale-link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SearchSlashIcon } from 'lucide-react';

type Props = {
  m: VideoType
  setOpen?: (value: boolean) => void

}

export function VideoItem({
  m,
  setOpen
}: Props) {
  return (
    <motion.div
      key={`media_item_${m.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <LocaleLink href={`/tv/${m.id}`} onClick={() => setOpen && setOpen(false)}>
        <CommandItem
          value={`${m.id}`}
          className='grid grid-cols-[auto,1fr] gap-x-2 h-[100px] overflow-clip'
        >
          <div
            className={cn(
              'h-full max-w-fit max-h-fit aspect-[5/7] rounded-[4px] text-center overflow-hidden',
              'w-[54px] h-[75px]'
            )}
          >
            {
              m.poster ? (
                <Image
                  className={cn(
                    'object-cover aspect-[5/7] max-w-fit max-h-fit',
                    m.isAdult && 'blur-[8px]'
                  )}
                  //src='https://image.tmdb.org/t/p/original/gstnSthunNwXD4kVyq9CC5JEP39.jpg'
                  src={`${m.poster.https ? 'https' : 'http'}://${m.poster.domain}${m.poster.path}`}
                  quality={55}
                  loading='lazy'
                  decoding='async'
                  alt='poster'
                  width={54}
                  height={75}
                />
              )
                : (
                  <div className='h-full flex justify-center items-center bg-border'>
                    <SearchSlashIcon />
                  </div>
                )
            }
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-xs text-secondary-foreground'>
              Завершён
            </p>
            <p className='text-base mb-1 truncate'>{m.title}</p>
            <p className='text-xs text-secondary-foreground opacity-80 mt-1'>
              {[m.mediaType === 'kino' && 'Фильм'].join(',')}
            </p>
          </div>
        </CommandItem>
      </LocaleLink>
    </motion.div>
  )
}