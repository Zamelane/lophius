import { ImagesType } from "@/src/shared/types";
import Image from "next/image";

type Props = {
  backdrops: ImagesType
}

export function MobileBackdrop({ backdrops }: Props) {
  return (
    <div className='relative md:hidden h-[450px] blur-lg opacity-80 object-cover'>
      {(backdrops.length > 0) && (
        <Image
          fill
          alt='Задник'
          className='object-cover object-top'
          src={
            backdrops[0].imgSrc
          }
        />
      )}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-80% to-background' />
    </div>
  )
}