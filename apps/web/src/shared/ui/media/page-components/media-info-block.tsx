import { InfoBlockItem } from "@/src/widgets/media/info-block-item"
import { InfoBlock, InfoBlockProps } from "./info-block"
import { MediaInfoType } from "@/src/shared/types/web-types"
import { Skeleton } from "../../shadcn/skeleton"
import { cn } from "@/src/shared/lib/utils"

type Props = {
  mediaInfo: MediaInfoType
  orientation: InfoBlockProps['orientation']
}

export function MediaInfoBlock({ mediaInfo, orientation }: Props) {
  const items: InfoBlockItem[] = []

  if (mediaInfo.meta?.releaseDate) {
    items.push({
      title: 'Дата выхода',
      href: '?modal=releaseDate',
      value: new Date(mediaInfo.meta.releaseDate).getFullYear().toString()
    })
  }

  if (mediaInfo.meta?.productionCountries?.length) {
    const country = mediaInfo.meta?.productionCountries[0]

    if (country.name) {
      items.push({
        value: country.name?.title,
        title: 'Страна оригинала',
        href: '/catalog?country=' + country.id
      })
    }
  }

  if (mediaInfo.meta?.spokenLanguages?.length) {
    const lanugages = mediaInfo.meta?.spokenLanguages

    if (lanugages.length === 1 && lanugages[0].name?.title) {
      items.push({
        value: lanugages[0].name?.title,
        title: 'Язык оригинала',
        href: '/catalog?language=' + lanugages[0].id
      })
    }

    if (lanugages.length > 1) {
      items.push({
        title: 'Языки оригинала',
        value: 'на ' + lanugages.length + ' языках',
        href: '?tab=languages'
      })
    }
  }

  if (mediaInfo.meta?.revenue) {
    items.push({
      title: 'Бюджет',
      value: new Intl.NumberFormat().format(mediaInfo.meta?.revenue) + ' $'
    })
  }

  if (mediaInfo.meta?.runtime) {
    items.push({
      title: 'Длительность',
      value: `${new Intl.NumberFormat().format(mediaInfo.meta?.runtime)} мин.`
    })
  }

  items.push(
    {
      title: 'Переводов',
      href: '?modal=translates',
      value: mediaInfo?.meta?.totalTranslations?.toString() || '1'
    })

  if (mediaInfo.isLoading) {
      return <div className={cn('flex gap-2', orientation === 'vertical' && 'flex-col')}>
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
        <Skeleton className="w-full h-[48px]" />
      </div>
  }

  return (
    <InfoBlock items={items} orientation={orientation} />
  )
}