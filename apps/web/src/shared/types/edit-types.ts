import type {
  CountryTranslation,
  GenreTranslation,
  VideoCategoryType,
  VideoTranslateType,
  VideoType,
  LanguageTranslation,
  SerialStatusType
} from '@/src/shared/types'
import type { Dispatch, SetStateAction } from 'react'

export type WithInfoDataType<T> = {
  get: T
  set: Dispatch<SetStateAction<T>>
}

export type LanguageInfoDataType = WithInfoDataType<LanguageTranslation[]>

export type CountryInfoDataType = WithInfoDataType<CountryTranslation[]>

export type GenreInfoDataType = WithInfoDataType<GenreTranslation[]>

export type ExternalLinksInfoDataType = WithInfoDataType<string[]>

export type VideoTypeInfoDataType = WithInfoDataType<VideoType | null>
export type VideoCategoryInfoDataType = WithInfoDataType<VideoCategoryType | null>
export type SerialProductionStatusInfoDataType =
  WithInfoDataType<null | SerialStatusType>
export type VideoTranslateInfoDataType = WithInfoDataType<VideoTranslateType[]>
export type OriginalLanguageInfoDataType =
  WithInfoDataType<LanguageTranslation | null>

export type VideoDetailedInfoDataType = {
  languages: LanguageInfoDataType
  countries: CountryInfoDataType
  genres: GenreInfoDataType
  links: ExternalLinksInfoDataType
  videoType: VideoTypeInfoDataType
  videoCategory: VideoCategoryInfoDataType
  serialStatus: SerialProductionStatusInfoDataType
  originalLanguage: OriginalLanguageInfoDataType
}

export type VideoTranslatesInfoDataType = {
  translates: VideoTranslateInfoDataType
  languages: LanguageInfoDataType
}
