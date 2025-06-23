import { LocaleLink } from '@/src/shared/hooks/locale-link'
import { cn } from '@/src/shared/lib/utils'
import { InfoBlockProps } from '@/src/shared/ui/media/page-components/info-block'
import React from 'react'

type InfoBlockTextItem = {
  title: string
  value: string
  href?: string
}

type InfoBlockComponentItem = {
  component: React.ReactNode
}

export type InfoBlockItem = InfoBlockTextItem | InfoBlockComponentItem

export type InfoBlockItemProps = InfoBlockItem & {
  isLast?: boolean
  orientation: InfoBlockProps['orientation']
}

export function InfoBlockItem({ isLast = false, orientation, ...props }: InfoBlockItemProps) {
  return (
    <>
      <div>
        {'component' in props ? (
          props.component
        ) : (
          <>
            <p className='text-sm font-semibold opacity-80'>{props.title}</p>
            {props.href ? (
              <LocaleLink href={props.href} className='text-sm hover:underline'>
                {props.value}
              </LocaleLink>
            ) : (
              <div className='text-sm'>{props.value}</div>
            )}
          </>
        )}
      </div>
      {!isLast && <div className={cn('shrink-0 bg-border', orientation === 'vertical' ? 'h-[1px] w-full' : 'h-full w-[1px]')} />}
    </>
  )
}