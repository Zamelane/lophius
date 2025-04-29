import { LocaleLink } from '@/hooks/locale-link'
import { cn } from '@/lib/utils'
import { ImageOffIcon } from 'lucide-react'
import Image from 'next/image'

type Props = {
  link: string
  img: {
    src?: string
    width: number
    height: number
    alt: string
  }
  title: string
  subText: string
  staticSize?: boolean
}

export function VideoCard(props: Props) {
  const { img, link, title, subText, staticSize = true } = props
  return (
    // flex flex-col gap-[8px] no-underline select-none w-[160px] min-w-[160px]
    <LocaleLink
      href={link}
      className={cn(
        'flex flex-col gap-[8px] text-start no-underline select-none',
        'transition-all duration-300 ease-in-out', // Плавный переход
        'hover:-translate-y-1 hover:scale-[1.02]', // Поднимаем на 1px и увеличиваем на 2%
        'active:scale-[0.99] active:translate-y-0', // Эффект нажатия
        staticSize ? 'w-[160px] min-w-[160px]' : 'w-full min-w-full relative'
      )}
    >
      {img.src ? (
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className={cn(
            'aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] max-h-[320px]',
            'border',
            'transition-all duration-300 ease-in-out', // Анимация только для изображения
            'group-hover:scale-[1.03]' // Увеличение изображения чуть сильнее
          )}
        />
      ) : (
        <div
          className={cn(
            'aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] max-h-[320px]',
            'border',
            'flex justify-center items-center',
            'transition-all duration-300 ease-in-out', // Анимация только для изображения
            'group-hover:scale-[1.03]' // Увеличение изображения чуть сильнее
          )}
        >
          <ImageOffIcon className='w-1/3 h-1/3 stroke-red-500' />
        </div>
      )}
      <div className='flex flex-col'>
        <p className='text-xs opacity-85'>{subText}</p>
        <p className='text-sm line-clamp-2'>{title}</p>
      </div>
    </LocaleLink>
  )
}
