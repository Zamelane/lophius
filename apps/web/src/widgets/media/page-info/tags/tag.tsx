'use client'

import { LocaleLink } from '@/src/shared/hooks/locale-link'

export type Tag = {
  href?: string
  style?: 'primary' | 'accent' | 'default'
  text: string
}

type Props = {
  tag: Tag
}

const styles = {
  'primary': 'inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-foreground text-primary-foreground hover:bg-primary/80 text-xs px-2.5 py-0.5 rounded-full',
  'accent': 'inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs px-2.5 py-0.5 rounded-full',
  'default': 'inline-flex flex-shrink-0 items-center border font-semibold transition-colors text-foreground text-xs px-2.5 py-0.5 rounded-full'
}

export function TagComponent({ tag }: Props) {
  const className = styles[tag.style || 'default']
  
  return (
    <>
      {tag.href ? (
        <LocaleLink href={tag.href} className={className}>
          {tag.text}
        </LocaleLink>
      ) : (
        <div className={className}>{tag.text}</div>
      )}
    </>
  )
}
