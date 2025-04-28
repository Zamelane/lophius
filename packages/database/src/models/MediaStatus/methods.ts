import { media_statuses } from "database/schemas"
import { MediaModel } from "../Media/model"
import { MediaStatusModel } from "./model"
import { MediaStatusRepository } from "./repository"
import { eq } from "drizzle-orm"
import { StatusModel } from "../Status/model"

/**
 * Операция Insert для модели UoW
 */
export async function insertMediaStatus(
	this: MediaStatusRepository,
	data: MediaStatusModel,
	status: StatusModel,
  media: MediaModel
) {
  media.validateRequiredIds()
	status.validateRequiredIds()

	await this.tx.insert(media_statuses)
		.values({
			...data,
      statusId: status.id,
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