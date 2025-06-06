'use client'

import type { GetTvDetailedInfoResult } from '@/src/features/media/pages/get-tv-detailed-info'
import { cn } from '@/src/shared/lib/utils'
import { SearchSlashIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { PhotoSlider } from 'react-photo-view/src'

type MediaPosterProps = {
  posters: GetTvDetailedInfoResult['posters']
  className?: string
}

export function MediaPoster({ posters, className = '' }: MediaPosterProps) {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className={`relative aspect-[5/7] rounded-[4px] ${className}`}
      >
        {
          posters.length > 0 && (
            <div className='inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full absolute top-1 right-1 z-10 cursor-pointer'>
              {posters.length} обложек
            </div>
          )
        }
        <div className='cursor-pointer'>
          {posters.length > 0 ? (
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
              {...(posters[0].width && posters[0].height
                ? {
                  src: posters[0].imgSrc,
                  width: posters[0].width,
                  height: posters[0].height
                }
                : {
                  fill: true,
                  src: posters[0].imgSrc
                })}
            />
          ) : (
            <div className='aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] flex justify-center items-center bg-border'>
              <SearchSlashIcon />
            </div>
          )}
        </div>
      </div>

      <PhotoSlider
        index={index}
        speed={() => 500}
        visible={visible}
        onIndexChange={setIndex}
        onClose={() => setVisible(false)}
        images={posters.map((poster, idx) => ({
          src: poster.imgSrc,
          key: idx.toString(),
          width: poster.width ?? undefined,
          height: poster.height ?? undefined
        }))}
      />
    </>
  )
}
