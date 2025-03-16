"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { ImageZoom } from "./zoomable-image"

const ZoomableAvatar = React.forwardRef<
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
ZoomableAvatar.displayName = AvatarPrimitive.Root.displayName

const ZoomableAvatarImage = React.forwardRef<
  React.ElementRef<typeof HTMLImageElement>, // Changed to HTMLImageElement
  { src?: string } & React.ComponentPropsWithoutRef<typeof ImageZoom> // Ensure src is optional
>(({ className, src, alt, ...props }, ref) => {
  // Only render ImageZoom if src is provided and not an empty string
  if (!src || src.length === 0) {
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
ZoomableAvatarImage.displayName = "AvatarImage"

const ZoomableAvatarFallback = React.forwardRef<
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
ZoomableAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { ZoomableAvatar, ZoomableAvatarImage, ZoomableAvatarFallback }