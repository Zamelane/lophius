import {ExternalPosterRepository} from "database/models";
import {ExternalPosterModel} from "database/models/ExternalPoster/model.ts";
import {queryOneResult} from "database/utils.ts";
import {external_logos, external_posters} from "database/schemas";
import { MediaModel } from "../Media/model";
import { and, eq, notInArray } from "drizzle-orm";
import { ExternalLogoRepository } from "./repository";
import { ExternalLogoModel } from "./model";

/**
 * Операция Insert для модели UoW
 */
export async function insertLogo(
	this: ExternalLogoRepository,
	data: ExternalLogoModel
) {
	data.validateRequiredIds()

	queryOneResult(
		await this.tx.insert(external_logos)
			.values(data)
			.onConflictDoNothing()
			.returning()
	)
}

/**
 * Операция DeleteNotIn для модели UoW
 */
export async function deleteNotInLogos(
	this: ExternalLogoRepository,
	logos: ExternalLogoModel[],
	media?: MediaModel
) {
	if (logos.length === 0 && !media) {
		return
	}

	for (const model of logos) {
		model.validateRequiredIds()
	}

	queryOneResult(
		await this.tx.delete(external_logos)
			.where(and(
				eq(external_logos.mediaId, logos.length ? logos[0].mediaId! : media?.id!),
				notInArray(external_logos.externalImageId, logos.map(v => v.externalImageId!))
			))
			.returning()
	)
}