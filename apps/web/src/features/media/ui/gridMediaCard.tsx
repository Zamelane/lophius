'use client'

import {
  VideoCard,
  type Props as VideoCardProps
} from '@/src/widgets/media/video-card'
import type { MediaType } from 'database/schemas/media_types'

type VideoProps = {
  mediaType: 'video'
} & VideoCardProps

type DefaultProps = {
  mediaType: Exclude<MediaType, 'video'>
}

export type Props = VideoProps | DefaultProps

export function GridMediaCard(props: Props) {
  if (props.mediaType === 'video') {
    return <VideoCard {...props} />
  }

  return null
}
