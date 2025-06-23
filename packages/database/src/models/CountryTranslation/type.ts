import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { countryTranslations } from '../../schemas'
import type { CountryModel } from '../Country/model'
import type { LanguageModel } from '../Language/model'

export type CountryTranslation = InferSelectModel<typeof countryTranslations>
export type OptionalCountryTranslation = WithOptional<
  CountryTranslation,
  'countryId' | 'languageId'
>
export type PartialCountryTranslation = Omit<
  CountryTranslation,
  'countryId' | 'languageId'
> & {
  language: LanguageModel
  country: CountryModel
}
