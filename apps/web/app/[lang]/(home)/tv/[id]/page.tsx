import { db } from "database";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LocaleLink } from "@/hooks/locale-link";
import {PageContainer} from "@/components/me-ui/container";
import {FilmInfo} from "@/components/template-components/media/page-info/film-info";

type Props = {
  params: Promise<{ id: string }>
}

export default async function TVDetailedPage({ params }: Props) {
  const id = Number((await params).id)

  if (!id) {
    notFound()
  }

  const mediaInfo = await db.query.medias.findFirst({
    where: (medias, { eq }) => eq(medias.id, id),
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

  function getDefaultPoster() {
    const posters = mediaInfo!.externalPosters

    if (!posters.length) {
      return undefined
    }

    return posters[0].externalImage
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

  const defaultPoster = getDefaultPoster()
  const defaultPosterToView = defaultPoster ? {
    ...(
      defaultPoster.width && defaultPoster.height
      ? {
        width: defaultPoster.width,
        height: defaultPoster.height,
      }
      : { fill: true }
    ),
    src: 'http'
      + (defaultPoster.externalDomain.https ? 's' : '')
      + '://'
      + defaultPoster.externalDomain.domain
      + defaultPoster.path
  } : undefined

  const primaryTitle = getPrimaryTitle()
  const primaryTagline = getPrimaryTagline() || getAnotherTitles()
  const overview = getOverview()

  return (
    <PageContainer className="px-[0] max-w-[1920px]">
      {/* Мобильная версия */}
      <div className="relative md:hidden h-[450px]">
        <Image
          fill
          alt="Задник"
          className="object-cover object-top"
          src="https://image.tmdb.org/t/p/original/u42yAt7tZVMizlei8zF6mJUSx2Q.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-80% to-background"/>
      </div>

      <div className="flex py-4 gap-4 px-[16px] md:px-[0]">
        {/* Десктопная версия */}
        <div className="hidden md:flex flex-col gap-2 h-full sticky top-4 min-w-[250px] max-w-[250px]">
          <div className="relative aspect-[5/7] rounded-[4px]">
            <div className="inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full absolute top-1 right-1 z-10"> {/* Добавлен z-10 */}
              {mediaInfo.externalPosters.length} обложек
            </div>
            {
              defaultPosterToView && <Image
                alt="Обложка"
                className="object-cover rounded-[4px] cursor-pointer"
                {...defaultPosterToView}
              />
            }
          </div>
          <div className="flex flex-col gap-2 max-w-[250px]">
            <button className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 [&_svg]:size-4 justify-center">
              Смотреть
            </button>
            <button className="inline-flex gap-2 items-center whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 [&_svg]:size-4 justify-center">
              Добавить в список
            </button>
          </div>
          <div className="border-[1px] border-border rounded-sm py-2 px-3 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-sm font-semibold opacity-80">Год выпуска</p>
                <LocaleLink className="text-sm hover:underline"
                      href="/tv/catalog?yearMin=2018&yearMax=2018">
                  2018
                </LocaleLink>
              </div>
              <div className="shrink-0 bg-border h-[1px] w-full"/>
              <div>
                <p className="text-sm font-semibold opacity-80">Страна оригинала</p>
                <LocaleLink href="/tv/catalog?country=123"
                      className="text-sm hover:underline">
                  Япония
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-grow min-w-0 max-w-full">
          <div className="z-40 flex md:hidden justify-center mt-[-425px]">
            <div className="relative aspect-[5/7] rounded-[4px] h-[350px]">
              <div
                className="inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full absolute top-1 right-1 z-10"> {/* Добавлен z-10 */}
                4 обложки
              </div>
              {
                defaultPosterToView && <Image
                  alt="Обложка"
                  className="object-cover rounded-[4px] cursor-pointer"
                  {...defaultPosterToView}
                />
              }
            </div>
          </div>
          <div className="z-40 flex justify-center md:justify-between items-start">
            <div className="flex flex-col text-center md:text-start">
              <h1 className="text-center md:text-start text-2xl font-semibold line-clamp-2">
                { primaryTitle }
              </h1>
              <p className="text-center md:text-start text-sm text-secondary-foreground opacity-80 line-clamp-2">
                { primaryTagline || <i>Без tagline ...</i> }
              </p>
            </div>
            <div className="hidden md:flex flex-col justify-end text-end">
              <button className="flex flex-col gap-1 items-end">
                <div className="flex gap-1 text-md font-semibold items-center">
                  9.73
                  <svg width="20" height="20" strokeWidth="0" fill="currentColor"
                       viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                       className="text-amber-500 w-[20px] h-[20px]">
                    <g fill="none">
                      <path d="M0 0h24v24H0V0z"></path>
                      <path d="M0 0h24v24H0V0z"></path>
                    </g>
                    <path
                      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
                  </svg>
                </div>
                <span className="font-normal text-xs text-nowrap">
                    0 оценок
                  </span>
              </button>
            </div>
          </div>
          <div className="z-40 flex flex-col gap-2 md:hidden">
            <button
              className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 [&_svg]:size-4 justify-center">
              Смотреть
            </button>
            <button
              className="inline-flex gap-2 items-center whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 [&_svg]:size-4 justify-center">
              Добавить в список
            </button>
          </div>
          <div className="flex flex-grow flex-col max-w-full">
            <FilmInfo overview={overview ?? undefined} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}