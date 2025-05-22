import type { LayoutProps } from '@/src/shared/types'
import { cn } from '@/src/shared/lib/utils'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({
  children,
  isPrimary = false,
  ...props
}: ButtonProps & LayoutProps & { isPrimary?: boolean }) {
  const className =
    'inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 [&_svg]:size-4 justify-center'
  const primary = 'bg-primary text-primary-foreground hover:bg-primary/90'
  const secondary =
    'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  return (
    <button
      className={cn(className, isPrimary ? primary : secondary)}
      {...props}
    >
      {children}
    </button>
  )
}
