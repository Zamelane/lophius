import { allFieldsDefined, ArrayElementType, GetPropertyType } from "@/interfaces";
import { DiscoverMovieResponse } from "../client";
import { db, Transaction } from "@/db";
import { MediaManager } from "@/managers";
import { logger } from "src";

export async function saveMovies(moviesData: DiscoverMovieResponse, sourceId: number, defaultLang: string) {
  if (!moviesData.results)
    throw new Error(`Сервер не вернул список фильмов`)

  for (const movie of moviesData.results) {
    await db.transaction(async (tx) => {
      await saveMovie(movie, sourceId, tx)
    })
  }
}

export async function saveMovie(
  movie: ArrayElementType<GetPropertyType<DiscoverMovieResponse, 'results'>>,
  sourceId: number,
  tx: Transaction
) {
  if (!allFieldsDefined(movie))
    throw new Error(`Некорректный ответ от сервера при сохранении фильма`)

  const {
    id: external_id,
    adult: isAdult,
    genre_ids,
    release_date,
    original_language,
    original_title,
    overview,
    vote_average,
    vote_count,
    poster_path,
    backdrop_path,
    title
  } = movie

  let media = await MediaManager.getByExternalId({
    external_id: external_id.toString(),
    sourceId
  })

  if (!media)
    media = await MediaManager.create({
      data: {
        external_id: external_id.toString(),
        isAdult,
        mediaType: 'kino',
        sourceId
      },
      tx
    })

  if (!media)
    logger.warn(`Не смог сохранить: ${external_id}`)

  
}