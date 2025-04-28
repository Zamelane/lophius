import {eq} from "drizzle-orm";
import {medias, sources} from "../../schemas";
import {MediaModel} from "./model";
import {and} from "drizzle-orm/sql/expressions/conditions";
import {
	Media,
	MediaId,
	SourceId,
	PartialMedia,
	queryOneResult, MediaRepository,
	pickExistingByType,
} from "../../index";

/**
 * Возвращает медиа по его id
 * @param mediaId
 */
export async function findMediaById(
	this: MediaRepository,
	mediaId: MediaId
): Promise<Media|undefined> {
	return queryOneResult(
		await this.tx
			.select()
			.from(medias)
			.where(eq(medias.id, mediaId))
	)
}

/**
 * Возвращает медиа по его внешнему id и id источника
 * @param externalId
 * @param sourceId
 */
export async function findMediaByExternalId(
	this: MediaRepository,
	externalId: string,
	sourceId: SourceId
): Promise<MediaModel|undefined> {
	const r = queryOneResult(
		await this.tx.select()
			.from(medias)
			.where(and(
				eq(medias.external_id, externalId),
				eq(medias.sourceId, sourceId)
			))
	)

	if (!r)
		return undefined

	return new MediaModel(r)
}

/**
 * Операция Insert для модели UoW
 */
export async function insertMedia(
	this: MediaRepository,
	data: {
		media: MediaModel,
		sourceId: SourceId
	}
) {
	return queryOneResult(
		await this.tx.insert(medias)
			.values({
				...pickExistingByType(data.media, ['mediaType', 'sourceId', 'isAdult', 'external_id', 'isVideo']),
				sourceId: data.sourceId
			})
			.returning(),
		r => data.media.id = r.id
	)!
}

export async function updateMedia(
	this: MediaRepository,
	media: MediaModel
) {
	media.validateRequiredIds()
	return queryOneResult(
		await this.tx.update(medias)
			.set({
				...media
			})
			.where(eq(medias.id, media.id))
			.returning(),
		r => media.set(r)
	)
}