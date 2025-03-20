import { Dispatch, SetStateAction } from "react"
import { GenreTranslation, CountryTranslation, LanguageTranslation } from "@/interfaces"

export type WithInfoDataType <T> = {
  get: T
  set: Dispatch<SetStateAction<T>>
}

export type LanguageInfoDataType = WithInfoDataType<LanguageTranslation[]>

export type CountryInfoDataType = WithInfoDataType<CountryTranslation[]>

export type GenreInfoDataType = WithInfoDataType<GenreTranslation[]>

export type DetailedInfoDataType = {
  languages: LanguageInfoDataType
  countries: CountryInfoDataType
  genres: GenreInfoDataType
}