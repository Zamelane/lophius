import { FilmManager, LanguageISO, LanguageManager } from "web-server/managers";
import { MovieDiscoverItem } from "../types";

export const movieAutoSaveDiscover = async (
  movie: MovieDiscoverItem,
  language: LanguageISO
) => {
  const manager = new FilmManager() // Заполняем новый фильм
  const parseLanguage = new LanguageManager({
    ...language
  })

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
  if (movie.overview)
    manager.media.overview.add({
      language: parseLanguage,
      overview: movie.overview
    })

  // Язык оригинального названия 
  const originalLanguage = new LanguageManager({
    iso_639_1: movie.original_language
  })

  // Оригинальное название
  manager.media.title.add({
    language: originalLanguage,
    title: movie.original_title,
    isOriginal: true
  })

  // Название на языке извлечения
  if (movie.title != movie.original_title)
    manager.media.title.add({
      language: parseLanguage,
      title: movie.title,
      isOriginal: false
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