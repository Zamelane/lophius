'use client'

import { MediaInfoType } from "@/src/shared/types/web-types";
import Image from "next/image";

type Props = {
  mediaInfo: MediaInfoType
}

export function MobileBackdrop({ mediaInfo }: Props) {
  const backdrop = mediaInfo.backdrops?.default.img
    || mediaInfo.posters?.default.img
    || undefined

  return (
    <div className='relative md:hidden h-[450px] blur-lg opacity-80 object-cover'>
      {backdrop && (
        <Image
          fill
          alt='Задник'
          className='object-cover object-top'
          src={
            `http${backdrop.https ? 's' : ''}://${backdrop.domain}${backdrop.path}`
          }
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-80% to-background' />
    </div>
  )
}