import { media_statuses } from "database/schemas"
import { MediaModel } from "../Media/model"
import { MediaStatusModel } from "./model"
import { MediaStatusRepository } from "./repository"
import { eq } from "drizzle-orm"

/**
 * Операция Insert для модели UoW
 */
export async function insertMediaStatus(
	this: MediaStatusRepository,
	data: MediaStatusModel,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.insert(media_statuses)
		.values({
			...data,
      status: data.status.toLocaleLowerCase(),
      mediaId: media.id
    })
		.onConflictDoNothing()

  data.mediaId = media.id
}

/**
 * Операция Delete для модели UoW
 */
export async function deleteMediaStatus(
	this: MediaStatusRepository,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.delete(media_statuses)
		.where(eq(media_statuses.mediaId, media.id))
}