import { external_logos } from 'database/schemas'
import { queryOneResult } from 'database/utils.ts'
import { and, eq, notInArray } from 'drizzle-orm'
import type { MediaModel } from '../Media/model'
import type { ExternalLogoModel } from './model'
import type { ExternalLogoRepository } from './repository'

/**
 * Операция Insert для модели UoW
 */
export async function insertLogo(
  this: ExternalLogoRepository,
  data: ExternalLogoModel
) {
  data.validateRequiredIds()

  queryOneResult(
    await this.tx
      .insert(external_logos)
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
    await this.tx
      .delete(external_logos)
      .where(
        and(
          eq(
            external_logos.mediaId,
            logos.length ? logos[0].mediaId! : media?.id!
          ),
          notInArray(
            external_logos.externalImageId,
            logos.map((v) => v.externalImageId!)
          )
        )
      )
      .returning()
  )
}
