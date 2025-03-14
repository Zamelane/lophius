"use client"

import { cn } from "@/lib/utils"
import { type ImgHTMLAttributes } from "react"
import Image, { type ImageProps } from "next/image"
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom"
//import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'
// TODO: когда isZoomed, дат ьмасштабировать ?

export interface ImageZoomProps extends ImageProps {
  className?: string
  zoomProps?: UncontrolledProps
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>
}

function getImageSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src
  if ("default" in src) return src.default.src
  return src.src
}

export function ImageZoom({
  children,
  zoomProps,
  className,
  zoomInProps,
  ...props
}: ImageZoomProps) {
  return (
    <Zoom
      zoomMargin={20}
      closeText="Close"
      wrapElement="span"
      classOverlay={cn(
        "absolute inset-0 transition-colors bg-background/80",
        "cursor-zoom-out"
      )}
      classDialog={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
      {...zoomProps}
      zoomImg={{
        sizes: undefined,
        src: getImageSrc(props.src),
        className: cn(
          "image-rendering-high-quality cursor-zoom-out object-cover w-full h-full rounded-md", // Добавлено object-cover, w-full и h-full
          zoomInProps?.className
        ),
        ...zoomInProps,
      }}
      canSwipeToUnzoom={true}
    >
      {children ?? (
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            className={cn(
              "cursor-zoom-in transition-all object-cover w-full h-full", // Добавлено object-cover, w-full и h-full
              className
            )}
            {...props}
          />
      )}
    </Zoom>
  )
}