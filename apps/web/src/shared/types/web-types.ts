import { MediasTableType } from "database/schemas"
import { ImageType } from "./types"

// Базовые типы
type LocalizedText = {
  lang: string | null
  text: string
}

type LocalizedTitle = {
  lang: string | null
  title: string
}

type LocalizedLink = {
  lang: string | null
  href: string
}

type LocalizedImage = {
  lang: string | null
  img: ImageType
}

// Общие сущности
type NamedEntity = {
  id: number
  name: LocalizedTitle
}

type Country = {
  id: number
  iso_3166_1: string
  name?: LocalizedTitle
}

// Составные типы
type MediaImageSet = {
  default: LocalizedImage
  total: number
}

type Person = {
  id: number
  name?: LocalizedTitle
  profilePath?: ImageType
  gender?: number
}

type Character =
  | string
  | {
      id: number
      name: LocalizedTitle
      profilePath?: string
    }

// Основной тип
export type MediaInfoType = {
  title?: LocalizedText
  tagline?: LocalizedText
  description?: LocalizedText

  posters?: MediaImageSet & {
    more: Array<ImageType>
  }
  backdrops?: MediaImageSet

  meta?: {
    rating?: {
      voteAverage: number
      voteCount: number | null
    }

    releaseDate?: string
    totalTranslations?: number

    homepage?: {
      default: LocalizedLink
      total: number
    }

    revenue?: number
    runtime?: number

    genres?: Array<NamedEntity>

    seasons?: Array<{
      id: number
      number: number
      name?: string
      overview?: string
      poster?: ImageType
      airDate?: Date
      episodes?: Array<{
        id: number
        number: string
        stillPath?: string
        airDate?: Date
        name?: string
        overview?: string
        runtime?: number
      }>
    }>

    actors?: Array<{
      id: number
      adult: boolean
      name?: LocalizedTitle
      order?: number
      profilePath?: ImageType
      character?: Character
    }>

    spokenLanguages?: Array<{
      id: number
      name?: LocalizedTitle
      iso_639_1: string
    }>

    createdBy?: Person[]

    //
    networks?: Array<{
      id: number
      logo: ImageType
      name: LocalizedTitle
      originCountry?: NamedEntity
    }>

    productionCountries?: Country[]

    productionCompanies?: Array<{
      id: number
      logo: ImageType
      name: LocalizedTitle
      originCountry: Country
    }>

    //
    recommendations?: Array<{
      id: number
      title?: LocalizedText
      poster?: LocalizedImage
    }>
  }

  source?: {
    title: string
    externalMediaId: string
  }

  _raw?: {
    media: MediasTableType
  }

  isLoading?: boolean
}