import { PersonItem, type Props as PersonItemProps } from './person-item'
import { VideoItem, type Props as VideoItemProps } from './video-item'

export type GlobalSearchItemCardProps =
  | ({ mediaType: 'video' } & VideoItemProps)
  | ({ mediaType: 'person' } & PersonItemProps)


export function GlobalSearchItemCard(props: GlobalSearchItemCardProps | undefined) {
  if (!props)
    return null

  if (props.mediaType === 'video') {
    return <VideoItem {...props} />
  }

  if (props.objectType === 'person') {
    return <PersonItem {...props} />
  }

  return null
}