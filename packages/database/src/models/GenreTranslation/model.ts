import type { WithRequired } from '../../index'
import type { OptionalGenreTranslation } from './type'

export class GenreTranslationModel implements OptionalGenreTranslation {
  genreId?: OptionalGenreTranslation['genreId']
  languageId?: OptionalGenreTranslation['languageId']
  value!: OptionalGenreTranslation['value']

  constructor(data: OptionalGenreTranslation) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalGenreTranslation,
    'genreId' | 'languageId'
  > {
    if (!this.genreId || !this.languageId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
