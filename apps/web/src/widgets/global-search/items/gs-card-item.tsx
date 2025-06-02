import { VideoItem, Props as VideoItemProps } from "./video-item"

export type GlobalSearchItemCardProps = {
  mediaType: 'kino'
} & VideoItemProps

export function GlobalSearchItemCard(props: GlobalSearchItemCardProps) {
  if (props.mediaType === 'kino') {
    return <VideoItem {...props}/>
  }

  return null
}