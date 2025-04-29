import { LocaleLink } from '@/hooks/locale-link'

type InfoBlockProps = {
  title: string
  value: string
  href?: string
  isLast?: boolean
}

export function InfoBlock({
  href,
  title,
  value,
  isLast = false
}: InfoBlockProps) {
  return (
    <>
      <div>
        <p className='text-sm font-semibold opacity-80'>{title}</p>
        {href ? (
          <LocaleLink href={href} className='text-sm hover:underline'>
            {value}
          </LocaleLink>
        ) : (
          <div className='text-sm'>{value}</div>
        )}
      </div>
      {!isLast && <div className='shrink-0 bg-border h-[1px] w-full' />}
    </>
  )
}
