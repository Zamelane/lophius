import {ExternalPosterRepository} from "database/models";
import {ExternalPosterModel} from "database/models/ExternalPoster/model.ts";
import {queryOneResult} from "database/utils.ts";
import {external_posters} from "database/schemas";
import { MediaModel } from "../Media/model";
import { and, eq, notInArray } from "drizzle-orm";

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

/**
 * Операция DeleteNotIn для модели UoW
 */
export async function deleteNotInPoster(
	this: ExternalPosterRepository,
	posters: ExternalPosterModel[],
	media?: MediaModel
) {
	if (posters.length === 0 && !media) {
		return
	}

	for (const model of posters) {
		model.validateRequiredIds()
	}

	queryOneResult(
		await this.tx.delete(external_posters)
			.where(and(
				eq(external_posters.mediaId, posters.length ? posters[0].mediaId! : media?.id!),
				notInArray(external_posters.externalImageId, posters.map(v => v.externalImageId!))
			))
			.returning()
	)
}