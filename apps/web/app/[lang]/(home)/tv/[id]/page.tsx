import {db} from "database";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Button} from "@/components/me-ui/button";
import {InfoBlock} from "@/components/template-components/media/info-block";
import {MediaPoster} from "@/components/template-components/media/media-poster";
import {RatingBadge} from "@/components/template-components/media/rating-badge";
import {FilmInfo} from "@/components/template-components/media/page-info/film-info";
import {ContentLayout} from "@/components/template-components/other/content-layout";

type Props = {
  params: Promise<{ id: string }>
}

export default async function TVDetailedPage({params}: Props) {
  const id = Number((await params).id)

  if (!id) {
    notFound()
  }

  const mediaInfo = await db.query.medias.findFirst({
    where: (medias, {eq}) => eq(medias.id, id),
    with: {
      translates: {
        with: {
          country: true,
          language: true
        }
      },
      externalPosters: {
        with: {
          externalImage: {
            with: {
              language: true,
              externalDomain: true
            }
          }
        }
      }
    }
  })

  if (!mediaInfo) {
    notFound()
  }

  function getPosters() {
    const posters = mediaInfo!.externalPosters

    return posters
  }

  function getPrimaryTitle() {
    const translates = mediaInfo!.translates

    if (!translates.length)
      return undefined

    return translates[0].title
  }

  function getAnotherTitles() {
    const translates = mediaInfo!.translates

    if (!translates.length)
      return undefined

    return translates.slice(1, translates.length - 1 > 3 ? 3 : translates.length - 1).map(v => v.title).join(' / ')
  }

  function getPrimaryTagline() {
    const translates = mediaInfo!.translates

    if (!translates.length)
      return undefined

    return translates[0].tagline
  }

  function getOverview() {
    const translates = mediaInfo!.translates

    if (!translates.length)
      return undefined

    return translates[0].overview
  }

  const posters = getPosters().map(poster => ({
      ...(
        poster.externalImage.width && poster.externalImage.height
          ? {
            width: poster.externalImage.width,
            height: poster.externalImage.height,
          }
          : {fill: true}
      ),
      src: 'http'
        + (poster.externalImage.externalDomain.https ? 's' : '')
        + '://'
        + poster.externalImage.externalDomain.domain
        + poster.externalImage.path
    }))

  const primaryTitle = getPrimaryTitle()
  const primaryTagline = getPrimaryTagline() || getAnotherTitles()
  const overview = getOverview()

  return (
    <ContentLayout className="px-0">
      {/* Мобильная версия */}
      <div className="relative md:hidden h-[450px] blur-lg opacity-80 object-cover">
        {posters.length > 0 && (
          <Image
            fill
            alt="Задник"
            src={posters[0].src}
            className="object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-80% to-background" />
      </div>

      <div className="flex py-4 gap-4 px-[16px] md:px-[0]">
        {/* Десктопная версия */}
        <div className="hidden md:flex flex-col gap-2 h-full sticky top-4 min-w-[250px] max-w-[250px]">
          <MediaPoster
            posters={posters}
            postersCount={mediaInfo.externalPosters.length}
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
              posters={posters}
              className="h-[350px] overflow-clip"
              postersCount={mediaInfo.externalPosters.length}
            />
          </div>
          <div className="z-40 flex justify-center md:justify-between items-start">
            <div className="flex flex-col text-center md:text-start">
              <h1 className="text-center md:text-start text-2xl font-semibold line-clamp-2">
                {primaryTitle}
              </h1>
              <p className="text-center md:text-start text-sm text-secondary-foreground opacity-80 line-clamp-2">
                {primaryTagline || <i>Без tagline ...</i>}
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
            <FilmInfo overview={overview ?? undefined}/>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}