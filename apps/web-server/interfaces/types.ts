import { Dispatch } from "react"
import { SWRConfiguration } from "swr"
import { FilesTableType } from "@/db/tables/files"
import { UsersTableType, GenresTableType, LanguagesTableType, CountriesTableType } from "@/db/tables"

// Для типизации страниц
export type IdType = {
  id: string
}

export type ParamsType = {
  params: Promise<IdType>
}

export type FallbackType<T> = {
  fallback?: SWRConfiguration
  fallbackData: T
}

// Вспомогательные
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type SetState<T> =  Dispatch<T>

// Вспомогательная типизация сущностей
export type Translate = {
  language: Language
  value: string
}

// Типизация сущностей
export type User = WithOptional<UsersTableType, 'email' | 'password'>
export type AvatarImage = FilesTableType
export type BackgroundImage = FilesTableType
export type Language = WithOptional<LanguagesTableType, 'id'>
export type Country = WithOptional<CountriesTableType, 'id'>

// Сущности переводов
export type LanguageTranslation = 
  WithOptional<Language, 'id'>
  & WithOptional<{translates: Translate[]}, 'translates'>
export type CountryTranslation =
  WithOptional<CountriesTableType, 'id'>
  & WithOptional<{translates: Translate[]}, 'translates'>
export type GenreTranslation =
  WithOptional<GenresTableType, 'id'>
  & WithOptional<{translates: Translate[]}, 'translates'>

// Объединения сущностей
export type UserInfo = User & {
  avatar?: AvatarImage | null
  background?: BackgroundImage | null
  isMe?: boolean
}

// Прочее
export type KinoType = 'film' | 'serial'
export type KinoCategoryType = 'anime' | 'cinema'
export type SerialStatusType = 'canceled' | 'coming out' | 'completed' | 'in production' | 'ongoing' | 'planned'
export type KinoTranslateType = {
  language: LanguageTranslation
  overview: string
  titles: string[]
}