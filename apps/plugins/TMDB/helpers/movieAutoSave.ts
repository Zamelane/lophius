import { FilmManager } from "../../../web-server/managers";
import { MovieDiscoverItem } from "../types";

export const movieAutoSaveDiscover = async (
  movie: MovieDiscoverItem,
  language: string
) => {
  const manager = new FilmManager() // Заполняем новый фильм

  manager.media.externalId = movie.id.toString()
  manager.isAdult = movie.adult
  manager.vote = {
    average: movie.vote_average,
    count: movie.vote_count
  }
  manager.media.overview.add({
    language,
    overview: movie.overview
  })
}