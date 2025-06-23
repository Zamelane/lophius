import type { CountryModel } from 'database/models/Country/model.ts'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { release_dates } from 'database/schemas'
import type { WithOptional } from '../../index'

export type ReleaseDate = typeof release_dates.$inferSelect
export type OptionalReleaseDate = WithOptional<
  ReleaseDate,
  'mediaId' | 'countryId'
>
export type PartialReleaseDate = Omit<ReleaseDate, 'mediaId' | 'countryId'> & {
  media: MediaModel
  country: CountryModel
}
