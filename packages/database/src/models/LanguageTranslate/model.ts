import type { WithRequired } from '../../index'
import type { OptionalLanguageTranslate } from './type'

export class LanguageTranslateModel implements OptionalLanguageTranslate {
  translateValueLanguageId?: OptionalLanguageTranslate['translateValueLanguageId']
  languageId?: OptionalLanguageTranslate['languageId']
  value!: OptionalLanguageTranslate['value']

  constructor(data: OptionalLanguageTranslate) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalLanguageTranslate,
    'translateValueLanguageId' | 'languageId'
  > {
    if (!this.translateValueLanguageId || !this.languageId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
