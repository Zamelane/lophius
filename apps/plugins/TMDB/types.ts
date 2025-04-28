import { PluginStorage } from "apps/parser-server/src/pluginsManager/pluginStorage"

export type StorageData = {
  parsedPage: number
  isParsed: boolean
  lastUpdateDate: Date
}

export type PluginArgs = {
  storage: PluginStorage
  data: StorageData
}

// Типизация ответа страницы фильмов
export type MovieDiscoverPage = {
  page: number
  total_pages: number
  total_results: number
  results: MovieDiscoverItem[]
}

export type MovieDiscoverItem = {
  adult: false
  backdrop_path: string|null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string|null
  popularity: number
  poster_path: string|null
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

// типизация ответа конфига языков
export type LanguagesConfig = {
  iso_639_1: string
  english_name: string
  name: string
}[]

export type CountriesPage = {
  iso_3166_1: string
  english_name: string
  native_name: string
}[]