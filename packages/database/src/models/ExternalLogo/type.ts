import type { ExternalImageModel } from 'database/models/ExternalImage/model'
import type { MediaModel } from 'database/models/Media/model.ts'
import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { external_logos } from '../../schemas'

export type ExternalLogo = InferSelectModel<typeof external_logos> & {
  externalImage: ExternalImageModel
  media: MediaModel
}
export type OptionalExternalLogo = WithOptional<
  ExternalLogo,
  'externalImageId' | 'mediaId'
>
export type PartialExternalLogo = Omit<
  ExternalLogo,
  'externalImageId' | 'mediaId'
>
