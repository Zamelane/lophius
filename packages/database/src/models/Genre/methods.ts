import { queryOneResult } from "database/utils"
import { GenreModel } from "./model"
import { GenreRepository } from "./repository"
import { genres } from "database/schemas"

/**
 * Операция Insert для модели UoW
 */
export async function insertGenre(
	this: GenreRepository,
	data: GenreModel
) {
	const english_name = data.english_name.toLocaleLowerCase()
	queryOneResult(
		await this.tx.insert(genres)
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
      v => data.id = v.id
	)
}