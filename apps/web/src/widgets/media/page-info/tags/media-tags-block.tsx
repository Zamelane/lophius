import { Tag } from "./tag";
import { TagContainer } from "./tag-container";
import { MediaInfoType } from "@/src/shared/types/web-types";

export type Props = {
  mediaInfo: MediaInfoType
}

export function MediaTagsBlock({ mediaInfo }: Props) {
  const tags: Tag[] = [
    // {
    //   style: 'accent',
    //   text: mediaInfo?._raw?.media.mediaType || '123',
    //   href: `/tv/catalog?type=${mediaInfo?._raw?.media.mediaType}`
    // },
    // {
    //   text: 'комедия',
    //   href: '/tv/catalog?genre=comedy'
    // }
  ]

  if (mediaInfo._raw?.media) {
    const contentType = mediaInfo._raw.media.contentType
    tags.push({
      style: 'accent',
      text: contentType === 'comic'
        ? 'комикс'
        : contentType === 'film'
          ? 'фильм'
          : contentType === 'novel'
            ? 'новелла'
            : 'сериал',
      href: `/tv/catalog?type=${mediaInfo?._raw?.media.mediaType}`
    })
  }

  if (mediaInfo.meta?.genres) {
    for (const genre of mediaInfo.meta.genres) {
      tags.push({
        text: genre.name.title,
        href: `/catalog?genre=${genre.id}`
      })
    }
  }

  return (
    <TagContainer tags={tags} />
  )
}