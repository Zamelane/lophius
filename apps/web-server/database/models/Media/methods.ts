import {eq} from "drizzle-orm";
import {medias, sources} from "@/database/schemas";
import {MediaModel} from "@/database/models/Media/model";
import {and} from "drizzle-orm/sql/expressions/conditions";
import {
	Media,
	MediaId,
	SourceId,
	PartialMedia,
	queryOneResult, MediaRepository,
	pickExistingByType,
} from "@/database";

/**
 * Возвращает медиа по его id
 * @param mediaId
 */
export async function getMediaById(
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
 * Возвращает медиа по его id и id источника
 * @param mediaId
 * @param sourceId
 */
export async function getMediaBySource(
	this: MediaRepository,
	mediaId: MediaId,
	sourceId: SourceId
) {
	return queryOneResult(
		await this.tx.select()
			.from(medias)
			.where(and(
				eq(medias.id, mediaId),
				eq(sources.id, sourceId)
			))
	)
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