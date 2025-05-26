'use client'

import { VideoCard, Props as VideoCardProps } from "@/src/widgets/media/video-card"
import { MediaType } from "database/schemas/media_types"

type KinoProps = {
  mediaType: 'kino'
} & VideoCardProps

type DefaultProps = {
  mediaType: Exclude<MediaType, 'kino'>
}

export type Props = KinoProps | DefaultProps

export function GridMediaCard(props: Props) {
  if (props.mediaType === 'kino') {
    return <VideoCard {...props} />
  }

  return null
}
