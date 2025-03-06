export type StorageData = {
  parsedPage: number
  isParsed: boolean
  lastUpdateDate: Date
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