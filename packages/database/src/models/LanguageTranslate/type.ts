import type { language_translations } from 'database/schemas/language_translations.ts'
import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'

export type LanguageTranslate = InferSelectModel<typeof language_translations>
export type OptionalLanguageTranslate = WithOptional<
  LanguageTranslate,
  'translateValueLanguageId' | 'languageId'
>
export type PartialLanguageTranslate = Omit<
  LanguageTranslate,
  'translateValueLanguageId' | 'languageId'
>
