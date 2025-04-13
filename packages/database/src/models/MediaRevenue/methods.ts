import { media_revenues } from "database/schemas/media_revenues"
import { MediaModel } from "../Media/model"
import { MediaRevenueModel } from "./model"
import { MediaRevenueRepository } from "./repository"
import { eq } from "drizzle-orm"

/**
 * Операция Insert для модели UoW
 */
export async function insertMediaRevenue(
	this: MediaRevenueRepository,
	data: MediaRevenueModel,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.insert(media_revenues)
		.values({
			...data,
      mediaId: media.id
    })
		.onConflictDoNothing()

  data.mediaId = media.id
}

/**
 * Операция Delete для модели UoW
 */
export async function deleteMediaRevenue(
	this: MediaRevenueRepository,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.delete(media_revenues)
		.where(eq(media_revenues.mediaId, media.id))
}