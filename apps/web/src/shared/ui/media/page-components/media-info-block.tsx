import { GetTvDetailedInfoResult } from "@/src/features/media/pages/get-tv-detailed-info"
import { InfoBlockItem } from "@/src/widgets/media/info-block-item"
import { InfoBlock, InfoBlockProps } from "./info-block"

type Props = {
  mediaInfo: GetTvDetailedInfoResult
  orientation: InfoBlockProps['orientation']
}

export function MediaInfoBlock({ mediaInfo, orientation }: Props) {
  const items: InfoBlockItem[] = [
    {
      value: '2018',
      title: 'Год выпуска',
      href: '/tv/catalog?yearMin=2018&yearMax=2018'
    },
    {
      title: 'Переводов',
      href: '?modal=translates',
      value: Math.max(
        mediaInfo.translates.titles.length,
        mediaInfo.translates.taglines.length,
        mediaInfo.translates.overviews.length
      ).toString()
    },
    {
      value: 'Япония',
      title: 'Страна оригинала',
      href: '/tv/catalog?country=123'
    }
  ]

  return (
    <InfoBlock items={items} orientation={orientation} />
  )
}