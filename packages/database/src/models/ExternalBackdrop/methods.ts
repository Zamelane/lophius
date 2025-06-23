import type { ExternalBackdropRepository } from 'database/models'
import type { ExternalBackdropModel } from 'database/models/ExternalBackdrop/model.ts'
import { external_backdrops } from 'database/schemas'
import { queryOneResult } from 'database/utils.ts'
import { and, eq, notInArray } from 'drizzle-orm'
import type { MediaModel } from '../Media/model'

/**
 * Операция Insert для модели UoW
 */
export async function insertBackdrop(
  this: ExternalBackdropRepository,
  data: ExternalBackdropModel
) {
  data.validateRequiredIds()

  queryOneResult(
    await this.tx
      .insert(external_backdrops)
      .values(data)
      .onConflictDoNothing()
      .returning()
  )
}

/**
 * Операция DeleteNotIn для модели UoW
 */
export async function deleteNotInBackdrops(
  this: ExternalBackdropRepository,
  backdrops: ExternalBackdropModel[],
  media?: MediaModel
) {
  if (backdrops.length === 0 && !media) {
    return
  }

  for (const model of backdrops) {
    model.validateRequiredIds()
  }

  queryOneResult(
    await this.tx
      .delete(external_backdrops)
      .where(
        and(
          eq(
            external_backdrops.mediaId,
            backdrops.length ? backdrops[0].mediaId! : media?.id!
          ),
          notInArray(
            external_backdrops.externalImageId,
            backdrops.map((v) => v.externalImageId!)
          )
        )
      )
      .returning()
  )
}
