import Image from "next/image";
import {notFound} from "next/navigation";
import {Button} from "@/components/me-ui/button";
import {InfoBlock} from "@/components/template-components/media/info-block";
import {MediaPoster} from "@/components/template-components/media/media-poster";
import {RatingBadge} from "@/components/template-components/media/rating-badge";
import {getTvDetailedInfo} from "@/actions/server/media/tv/get-tv-detailed-info";
import {FilmInfo} from "@/components/template-components/media/page-info/film-info";
import {ContentLayout} from "@/components/template-components/other/content-layout";

export const revalidate = 3600

type Props = {
  params: Promise<{ id: string }>
}

export default async function TVDetailedPage({params}: Props) {
  const id = Number((await params).id)

  if (!id) {
    notFound()
  }

  const mediaInfo = await getTvDetailedInfo({id})

  if (!mediaInfo) {
    notFound()
  }

  return (
    <ContentLayout className="px-0">
      {/* Мобильная версия */}
      <div className="relative md:hidden h-[450px] blur-lg opacity-80 object-cover">
        {(mediaInfo.backdrops.length > 0 || mediaInfo.posters.length > 0) && (
          <Image
            fill
            alt="Задник"
            className="object-cover object-top"
            src={mediaInfo.backdrops.length > 0 ? mediaInfo.backdrops[0].imgSrc : mediaInfo.posters[0].imgSrc}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-80% to-background" />
      </div>

      <div className="flex py-4 gap-4 px-[16px] md:px-[0]">
        {/* Десктопная версия */}
        <div className="hidden md:flex flex-col gap-2 h-full sticky top-4 min-w-[250px] max-w-[250px]">
          <MediaPoster
            posters={mediaInfo.posters}
          />
          <div className="flex flex-col gap-2 max-w-[250px]">
            <Button isPrimary>Смотреть</Button>
            <Button>Добавить в список</Button>
          </div>
          <div className="border-[1px] border-border rounded-sm py-2 px-3 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <InfoBlock
                value="2018"
                title="Год выпуска"
                href="/tv/catalog?yearMin=2018&yearMax=2018"
              />
              <InfoBlock
                title="Переводов"
                href="?modal=translates"
                value={
                  Math.max(
                    mediaInfo.translates.titles.length,
                    mediaInfo.translates.taglines.length,
                    mediaInfo.translates.overviews.length
                  ).toString()
                }
              />
              <InfoBlock
                isLast
                value="Япония"
                title="Страна оригинала"
                href="/tv/catalog?country=123"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-grow min-w-0 max-w-full">
          <div className="z-40 flex md:hidden justify-center mt-[-425px]">
            <MediaPoster
              posters={mediaInfo.posters}
              className="h-[350px] overflow-clip"
            />
          </div>
          <div className="z-40 flex justify-center md:justify-between items-start">
            <div className="flex flex-col text-center md:text-start">
              <h1 className="text-center md:text-start text-2xl font-semibold line-clamp-2">
                {
                  mediaInfo.translates.titles.length
                    ? mediaInfo.translates.titles[0]
                    : <i>[Без заголовка]</i>
                }
              </h1>
              <p className="text-center md:text-start text-sm text-secondary-foreground opacity-80 line-clamp-2">
                {
                  mediaInfo.translates.taglines.length
                    ? mediaInfo.translates.taglines[0]
                    : <i>Без tagline ...</i>
                }
              </p>
            </div>
            <div className="hidden md:flex flex-col justify-end text-end">
              <RatingBadge rating="9.73" votes="0 оценок" />
            </div>
          </div>
          <div className="z-40 flex flex-col gap-2 md:hidden">
            <Button isPrimary>Смотреть</Button>
            <Button>Добавить в список</Button>
          </div>
          <div className="flex flex-grow flex-col max-w-full">
            <FilmInfo mediaInfo={mediaInfo}/>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}