import { InfoBlockItem } from "@/src/widgets/media/info-block-item"
import { InfoBlock, InfoBlockProps } from "./info-block"
import { MediaInfoType } from "@/src/shared/types/web-types"

type Props = {
  mediaInfo: MediaInfoType
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
      value: mediaInfo?.meta?.totalTranslations?.toString() || '1'
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