import type { LanguageModel } from 'database/models/Language/model.ts'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { spoken_languages } from 'database/schemas'
import type { WithOptional } from '../../index'

export type SpokenLanguage = typeof spoken_languages.$inferSelect
export type OptionalSpokenLanguage = WithOptional<
  SpokenLanguage,
  'languageId' | 'mediaId'
>
export type PartialSpokenLanguage = Omit<
  SpokenLanguage,
  'languageId' | 'mediaId'
> & {
  media: MediaModel
  language: LanguageModel
}
