import { genres } from 'database/schemas'
import { queryOneResult } from 'database/utils'
import type { GenreModel } from './model'
import type { GenreRepository } from './repository'

/**
 * Операция Insert для модели UoW
 */
export async function insertGenre(this: GenreRepository, data: GenreModel) {
  const english_name = data.english_name.toLocaleLowerCase()
  queryOneResult(
    await this.tx
      .insert(genres)
      .values({
        english_name
      })
      .onConflictDoUpdate({
        target: genres.english_name,
        set: {
          english_name
        }
      })
      .returning(),
    (v) => (data.id = v.id)
  )
}
