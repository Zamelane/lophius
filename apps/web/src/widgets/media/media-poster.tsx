'use client'

import { cn } from '@/src/shared/lib/utils'
import { MediaInfoType } from '@/src/shared/types/web-types'
import { calculateImageSrc } from '@/src/utils/calculateImageSrc'
import { SearchSlashIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { PhotoSlider } from 'react-photo-view/src'

type MediaPosterProps = {
  mediaInfo: MediaInfoType
  className?: string
}

export function MediaPoster({ mediaInfo, className = '' }: MediaPosterProps) {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const poster = mediaInfo.posters?.default

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className={`relative aspect-[5/7] rounded-[4px] ${className}`}
      >
        {
          poster && (
            <div className='inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full absolute top-1 right-1 z-10 cursor-pointer'>
              {mediaInfo.posters?.total || 1} обложек
            </div>
          )
        }
        <div className='cursor-pointer'>
          {poster ? (
            <Image
              className={cn(
                'aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px]',
                //m.isAdult && 'blur-[8px]'
              )}
              //src='https://image.tmdb.org/t/p/original/gstnSthunNwXD4kVyq9CC5JEP39.jpg'
              quality={55}
              loading='lazy'
              decoding='async'
              alt='Обложка'
              {...(poster.img.width && poster.img.height
                ? {
                  src: calculateImageSrc(poster.img),
                  width: poster.img.width,
                  height: poster.img.height
                }
                : {
                  fill: true,
                  src: calculateImageSrc(poster.img)
                })}
            />
          ) : (
            <div className='aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] flex justify-center items-center bg-border'>
              <SearchSlashIcon />
            </div>
          )}
        </div>
      </div>

      {
        mediaInfo.posters && (
          <PhotoSlider
            index={index}
            speed={() => 500}
            visible={visible}
            onIndexChange={setIndex}
            onClose={() => setVisible(false)}
            images={mediaInfo.posters?.more.map((poster, idx) => ({
              src: calculateImageSrc(poster),
              key: idx.toString(),
              width: poster.width ?? undefined,
              height: poster.height ?? undefined
            }))}
          />
        )
      }
    </>
  )
}
