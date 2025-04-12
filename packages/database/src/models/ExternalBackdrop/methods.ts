import {ExternalBackdropRepository} from "database/models";
import {queryOneResult} from "database/utils.ts";
import {external_backdrops, external_posters} from "database/schemas";
import {ExternalBackdropModel} from "database/models/ExternalBackdrop/model.ts";

/**
 * Операция Insert для модели UoW
 */
export async function insertBackdrop(
	this: ExternalBackdropRepository,
	data: ExternalBackdropModel
) {
	data.validateRequiredIds()

	queryOneResult(
		await this.tx.insert(external_backdrops)
			.values(data)
			.onConflictDoNothing()
			.returning()
	)
}