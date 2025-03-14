"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { ImageZoom } from "./zoomable-image"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof HTMLImageElement>, // Changed to HTMLImageElement
  React.ComponentPropsWithoutRef<typeof ImageZoom> & { src?: string } // Ensure src is optional
>(({ className, src, alt, ...props }, ref) => {
  // Only render ImageZoom if src is provided and not an empty string
  if (!src) {
    return null; // Return null to avoid rendering the image element
  }

  return (
    <div className={cn("aspect-square h-full w-full", className)}>
      <ImageZoom
        ref={ref}
        src={src}
        alt={alt || "Avatar"} // Provide a default alt text if none is provided
        className="aspect-square h-full w-full object-cover"
        {...props}
      />
    </div>
  );
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }