import type { LayoutProps } from '@/src/shared/types'
import { cn } from '@/src/shared/lib/utils'

type Props = LayoutProps & {
  className?: string
}

export function Title({ children, className }: Props) {
  return <h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
}
