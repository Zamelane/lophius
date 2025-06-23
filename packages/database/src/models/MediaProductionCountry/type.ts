import type { CountryModel } from 'database/models/Country/model.ts'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { media_production_countries } from 'database/schemas'
import type { WithOptional } from '../../index'

export type MediaProductionCountry =
  typeof media_production_countries.$inferSelect
export type OptionalMediaProductionCountry = WithOptional<
  MediaProductionCountry,
  'mediaId' | 'countryId'
>
export type PartialMediaProductionCountry = Omit<
  MediaProductionCountry,
  'mediaId' | 'countryId'
> & {
  country: CountryModel
  media: MediaModel
}
