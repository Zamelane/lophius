import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex",
    "items-center justify-center gap-y-2",
    "px-3.5 py-0",
    "rounded-md border-none",
    "bg-transparent",
    "text-center leading-[30px] text-btn-default-text select-none",
    "tap-transparent",
    "active:scale-95 will-change-transform",
    "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-btn-primary-filled",
          "text-white",
          "hover:opacity-90 active:opacity-80"
        )
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}