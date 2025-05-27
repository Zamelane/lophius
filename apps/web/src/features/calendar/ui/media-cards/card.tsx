import { VideoCard, VideoItemCardProps } from "./video-card"

type VideoProps = VideoItemCardProps & {
  mediaType: 'kino'
}

export type CardItemProp = VideoProps

export function CardItem({ mediaType, ...props }: CardItemProp) {
  if (mediaType === 'kino')
    return <VideoCard {...props}/>

  return null
}