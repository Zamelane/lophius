"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"
import { toggleVariants } from "@/components/shadcn/ui/toggle"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  VariantProps<typeof toggleVariants> &
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ size, variant, children, className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ size, variant }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  VariantProps<typeof toggleVariants> &
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ size, variant, children, className, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          size: context.size || size,
          variant: context.variant || variant,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
