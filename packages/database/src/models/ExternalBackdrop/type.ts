import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { external_backdrops } from '../../schemas'
import type { ExternalImageModel } from '../ExternalImage/model'
import type { MediaModel } from '../Media/model'

export type ExternalBackdrop = InferSelectModel<typeof external_backdrops> & {
  externalImage: ExternalImageModel
  media: MediaModel
}
export type OptionalExternalBackdrop = WithOptional<
  ExternalBackdrop,
  'externalImageId' | 'mediaId'
>
export type PartialExternalBackdrop = Omit<
  ExternalBackdrop,
  'externalImageId' | 'mediaId'
>
