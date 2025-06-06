import { Tag } from "./tag";
import { TagContainer } from "./tag-container";
import { MediaInfoType } from "@/src/shared/types/web-types";

export type Props = {
  mediaInfo: MediaInfoType
}

export function MediaTagsBlock({ mediaInfo }: Props) {
  const tags: Tag[] = [
    {
      style: 'accent',
      text: mediaInfo?._raw?.media.mediaType || '123',
      href: `/tv/catalog?type=${mediaInfo?._raw?.media.mediaType}`
    },
    {
      text: 'комедия',
      href: '/tv/catalog?genre=comedy'
    }
  ]

  return (
    <TagContainer tags={tags} />
  )
}