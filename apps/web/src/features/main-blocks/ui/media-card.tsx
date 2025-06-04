'use client'

import { LocaleLink } from "@/src/shared/hooks/locale-link";
import { cn } from "@/src/shared/lib/utils";
import { Image } from "@/src/shared/ui/media/image";
import { SearchSlashIcon } from "lucide-react";

export type VideoMediaCardProps = {
  id: number
  title: string,
  prefix?: string
  img?: {
    domain: string
    https: boolean
    path: string
    width: number|null
    height: number|null
  }
}

export function VideoMediaCard({
  id,
  title,
  prefix,
  img
}: VideoMediaCardProps) {
  return (
    <LocaleLink href={`media/${id}`} className="flex flex-col gap-[8px] no-underline select-none w-[160px] min-w-[160px]">
      {img ? (
              <Image
                className={cn(
                  'aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px]',
                  //m.isAdult && 'blur-[8px]'
                )}
                //src='https://image.tmdb.org/t/p/original/gstnSthunNwXD4kVyq9CC5JEP39.jpg'
                src={`${img.https ? 'https' : 'http'}://${img.domain}${img.path}`}
                quality={55}
                loading='lazy'
                decoding='async'
                alt='poster'
                {...(img.width && img.height ? { width: img.width, height: img.height } : { fill: true })}
              />
            ) : (
              <div className='aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] flex justify-center items-center bg-border'>
                <SearchSlashIcon />
              </div>
            )}
      <div className="flex flex-col">
        <p className="text-xs opacity-85">{prefix}</p>
        <p className="text-sm line-clamp-2">{title}</p>
      </div>
    </LocaleLink>
  )
}