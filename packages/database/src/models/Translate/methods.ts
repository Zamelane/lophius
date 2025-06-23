import { pickExistingByType, queryOneResult } from '../../index'
import { translates } from '../../schemas/translates'
import type { TranslateRepository } from './repository'
import type { TranslatedModel } from './type'

/**
 * Операция Insert для модели UoW
 */
export async function insertTranslate(
  this: TranslateRepository,
  data: TranslatedModel
) {
  // Валидируем наличие данных
  data.media.validateRequiredIds()
  data.language.validateRequiredIds()
  data?.country?.validateRequiredIds()

  return queryOneResult(
    await this.tx
      .insert(translates)
      .values({
        ...pickExistingByType(data, [
          'title',
          'overview',
          'homepage',
          'runtime',
          'tagline',
          'isOriginal'
        ]),
        mediaId: data.media.id,
        countryId: data?.country?.id,
        languageId: data.language.id
      })
      .returning()
  )!
}
