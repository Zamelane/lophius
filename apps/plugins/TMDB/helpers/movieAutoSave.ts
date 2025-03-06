import { FilmManager } from "web-server/managers";
import { MovieDiscoverItem } from "../types";

export const movieAutoSaveDiscover = async (
  movie: MovieDiscoverItem,
  language: string
) => {
  const manager = new FilmManager() // Заполняем новый фильм

  // Внешний id
  manager.media.externalId = movie.id.toString()

  // Пошлятина или страхи ???
  manager.isAdult = movie.adult

  // Внешняя оценка
  manager.vote = {
    average: movie.vote_average,
    count: movie.vote_count
  }

  // Описание
  manager.media.overview.add({
    language,
    overview: movie.overview
  })

  // Заголовки
  manager.media.title.add({
    language,
    title: movie.title
  })

  if (movie.original_language != language)
    manager.media.title.add({
      language: movie.original_language,
      title: movie.original_title
    })

  // Постер
  if (movie.poster_path)
    manager.posterPath = movie.poster_path

  // Задняя картинка ???
  if (movie.backdrop_path)
    manager.backdropPath = movie.backdrop_path

  //TODO: жанры сохранить тоже нужно !!!

  await manager.save()
}