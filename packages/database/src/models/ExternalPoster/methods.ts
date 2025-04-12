import {ExternalPosterRepository} from "database/models";
import {ExternalPosterModel} from "database/models/ExternalPoster/model.ts";
import {queryOneResult} from "database/utils.ts";
import {external_posters} from "database/schemas";

/**
 * Операция Insert для модели UoW
 */
export async function insertPoster(
	this: ExternalPosterRepository,
	data: ExternalPosterModel
) {
	data.validateRequiredIds()

	queryOneResult(
		await this.tx.insert(external_posters)
			.values(data)
			.onConflictDoNothing()
			.returning()
	)
}