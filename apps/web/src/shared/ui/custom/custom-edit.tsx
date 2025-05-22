import type { LayoutProps } from '@/src/shared/types'

type EditSectionType = LayoutProps & {
  title: string
  isRequired?: boolean
}

export function EditSection({
  title,
  children,
  isRequired = false
}: EditSectionType) {
  return (
    <div className='flex flex-col gap-2'>
      <h6 className='font-semibold text-sm'>
        {title}{' '}
        {isRequired ? (
          <span className='text-xs text-red-500'>{' *'}</span>
        ) : null}
      </h6>
      {children}
    </div>
  )
}

export function EditSectionItem({ children }: LayoutProps) {
  return (
    <div className='flex flex-col md:flex-row gap-2 w-full'>{children}</div>
  )
}

export function EditSectionGroup({ children }: LayoutProps) {
  return <div className='flex gap-2 w-full'>{children}</div>
}
