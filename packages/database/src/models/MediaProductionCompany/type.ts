import type { GenreModel } from 'database/models/Genre/model.ts'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { media_production_companies } from 'database/schemas'
import type { WithOptional } from '../../index'

export type MediaProductionCompany =
  typeof media_production_companies.$inferSelect
export type OptionalMediaProductionCompany = WithOptional<
  MediaProductionCompany,
  'mediaId' | 'companyId'
>
export type PartialMediaProductionCompany = Omit<
  MediaProductionCompany,
  'genreId' | 'mediaId'
> & {
  genre: GenreModel
  media: MediaModel
}
