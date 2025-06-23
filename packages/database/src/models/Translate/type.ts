import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { translates } from '../../schemas/translates'
import type { CountryModel } from '../Country/model'
import type { LanguageModel } from '../Language/model'
import type { MediaModel } from '../Media/model'

export type Translate = InferSelectModel<typeof translates>
export type OptionalTranslate = WithOptional<
  Translate,
  'countryId' | 'id' | 'languageId' | 'mediaId'
>
export type PartialTranslate = Omit<
  Translate,
  'countryId' | 'id' | 'languageId' | 'mediaId'
>
export type TranslatedModel = PartialTranslate & {
  media: MediaModel
  country?: CountryModel
  language: LanguageModel
}
