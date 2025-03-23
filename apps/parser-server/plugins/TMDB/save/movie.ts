import { DiscoverMovieResponse } from "../client";

export function saveMovies(moviesData: DiscoverMovieResponse, defaultLang: string) {
  if (!moviesData.results)
    throw new Error(`Сервер не вернул список фильмов`)

  for (const movie of moviesData.results) {
    
  }
}