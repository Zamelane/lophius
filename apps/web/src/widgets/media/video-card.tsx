'use client'

import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { cn } from '@/src/shared/lib/utils'
import { ImageOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export type Props = {
  id: number
  img:
    | {
        width?: number | null
        height?: number | null
        path: string
        domain: string
        https: boolean
      }
    | null
    | undefined
  title?: string | null
  subText: string
  inListBadge?: {
    title: string
    i18nTitle?: string | null
  }
  staticSize?: boolean
}

export function VideoCard(props: Props) {
  const t = useTranslations('Lists')
  const { img, id, title, subText, inListBadge, staticSize = false } = props
  return (
    // flex flex-col gap-[8px] no-underline select-none w-[160px] min-w-[160px]
    <LocaleLink
      href={`/media/${id}`}
      className={cn(
        'flex flex-col gap-[8px] text-start no-underline select-none',
        'transition-all duration-300 ease-in-out', // Плавный переход
        'hover:-translate-y-1 hover:scale-[1.02]', // Поднимаем на 1px и увеличиваем на 2%
        'active:scale-[0.99] active:translate-y-0', // Эффект нажатия
        staticSize ? 'w-[160px] min-w-[160px]' : 'w-full min-w-full relative'
      )}
    >
      {inListBadge && (
        <div className='flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-foreground text-primary-foreground hover:bg-primary/80 text-[10px] px-1.5 py-0.5 rounded-sm absolute top-[4px] left-[-3px] line-clamp-1'>
          {inListBadge.i18nTitle ? t(inListBadge.i18nTitle) : inListBadge.title}
        </div>
      )}
      {img ? (
        <Image
          src={`http${img.https ? 's' : ''}://${img.domain}${img.path}`}
          alt='Постер'
          className={cn(
            'aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] max-h-[320px]',
            'border',
            'transition-all duration-300 ease-in-out', // Анимация только для изображения
            'group-hover:scale-[1.03]' // Увеличение изображения чуть сильнее
          )}
          {...(img.width && img.height
            ? { width: img.width, height: img.height }
            : { fill: true })}
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
