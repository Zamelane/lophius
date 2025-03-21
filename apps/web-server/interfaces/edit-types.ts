import { Dispatch, SetStateAction } from "react"
import {
  KinoType,
  SerialStatusType,
  GenreTranslation,
  KinoCategoryType,
  CountryTranslation,
  LanguageTranslation
} from "@/interfaces"

export type WithInfoDataType <T> = {
  get: T
  set: Dispatch<SetStateAction<T>>
}

export type LanguageInfoDataType = WithInfoDataType<LanguageTranslation[]>

export type CountryInfoDataType = WithInfoDataType<CountryTranslation[]>

export type GenreInfoDataType = WithInfoDataType<GenreTranslation[]>

export type ExternalLinksInfoDataType = WithInfoDataType<string[]>

export type KinoTypeInfoDataType = WithInfoDataType<KinoType|null>
export type KinoCategoryInfoDataType = WithInfoDataType<KinoCategoryType|null>
export type SerialProductionStatusInfoDataType = WithInfoDataType<null|SerialStatusType>

export type KinoDetailedInfoDataType = {
  languages: LanguageInfoDataType
  countries: CountryInfoDataType
  genres: GenreInfoDataType
  links: ExternalLinksInfoDataType
  kinoType: KinoTypeInfoDataType
  kinoCategory: KinoCategoryInfoDataType
  serialStatus: SerialProductionStatusInfoDataType
}