import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex",
    "items-center justify-center gap-y-2",
    "px-3.5 py-0",
    "rounded-md border-none",
    "text-center leading-[30px] text-white select-none",
    "tap-transparent",
    "active:scale-95 hover:opacity-90 active:opacity-80 will-change-transform",
    "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
  ),
  {
    variants: {
      color: {
        default: 'bg-btn-primary-default-filled',
        'color-1': 'bg-btn-primary-filled-color-1',
        'color-2': 'bg-btn-primary-filled-color-2',
        'color-3': 'bg-btn-primary-filled-color-3',
        'color-4': 'bg-btn-primary-filled-color-4',
        'color-5': 'bg-btn-primary-filled-color-5'
      },
      variant: {
        default: 'bg-btn-default-filled text-btn-default-text',
        primary: '',
        filled: 'bg-btn-is-filled'
      },
      size: {
        default: '',
        icon: 'pl-0 pr-0 w-8'
      }
    },
    defaultVariants: {
      variant: "primary",
      color: 'default',
      size: 'default'
    },
  }
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  color,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, color, size }), className)}
      {...props}
    />
  )
}