import { MediaModel } from "../Media/model"
import { MediaBudgetModel } from "./model"
import { MediaBudgetRepository } from "./repository"
import { media_budgets } from "database/schemas"
import { eq } from "drizzle-orm"

/**
 * Операция Insert для модели UoW
 */
export async function insertMediaBudget(
	this: MediaBudgetRepository,
	data: MediaBudgetModel,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.insert(media_budgets)
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
export async function deleteMediaBudget(
	this: MediaBudgetRepository,
  media: MediaModel
) {
  media.validateRequiredIds()

	await this.tx.delete(media_budgets)
		.where(eq(media_budgets.mediaId, media.id))
}