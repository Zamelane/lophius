import { VideoCard, type VideoItemCardProps } from './video-card'

type VideoProps = VideoItemCardProps & {
  mediaType: 'video'
}

export type CardItemProp = VideoProps

export function CardItem({ mediaType, ...props }: CardItemProp) {
  if (mediaType === 'video') return <VideoCard {...props} />

  return null
}
