import { media_genres } from 'database/schemas'
import { queryOneResult } from 'database/utils'
import { and, eq, notInArray } from 'drizzle-orm'
import type { GenreModel } from '../Genre/model'
import type { MediaModel } from '../Media/model'
import type { MediaGenreModel } from './model'
import type { MediaGenreRepository } from './repository'

/**
 * Операция Insert для модели UoW
 */
export async function insertMediaGenre(
  this: MediaGenreRepository,
  data: MediaGenreModel
) {
  data.validateRequiredIds()

  queryOneResult(
    await this.tx
      .insert(media_genres)
      .values({
        ...data
      })
      .onConflictDoNothing()
      .returning()
  )
}

/**
 * Операция DeleteNotIn для модели UoW
 */
export async function deleteNotInGenres(
  this: MediaGenreRepository,
  genres: GenreModel[],
  media: MediaModel
) {
  media.validateRequiredIds()
  for (const model of genres) {
    model.validateRequiredIds()
  }

  queryOneResult(
    await this.tx
      .delete(media_genres)
      .where(
        and(
          eq(media_genres.mediaId, media.id),
          notInArray(
            media_genres.genreId,
            genres.map((v) => v.id!)
          )
        )
      )
      .returning()
  )
}
