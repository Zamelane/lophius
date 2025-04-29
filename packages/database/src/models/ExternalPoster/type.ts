import type { ExternalImageModel } from 'database/models/ExternalImage/model'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { external_posters } from '../../schemas'

export type ExternalPoster = InferSelectModel<typeof external_posters> & {
  externalImage: ExternalImageModel
  media: MediaModel
}
export type OptionalExternalPoster = WithOptional<
  ExternalPoster,
  'externalImageId' | 'mediaId'
>
export type PartialExternalPoster = Omit<
  ExternalPoster,
  'externalImageId' | 'mediaId'
>
