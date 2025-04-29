import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { languages } from '../../schemas'

export type Language = InferSelectModel<typeof languages>
export type OptionalLanguage = WithOptional<Language, 'id'>
export type PartialLanguage = Omit<Language, 'id'>
export type OptionalNamesLanguage = WithOptional<
  PartialLanguage,
  'english_name' | 'native_name'
>

export type OptionalLanguageId = OptionalLanguage['id']
export type LanguageId = Language['id']
