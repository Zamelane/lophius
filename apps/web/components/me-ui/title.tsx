import type { LayoutProps } from '@/interfaces'
import { cn } from '@/lib/utils'

type Props = LayoutProps & {
  className?: string
}

export function Title({ children, className }: Props) {
  return <h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
}
