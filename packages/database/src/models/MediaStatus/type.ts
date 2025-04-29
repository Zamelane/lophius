import type { MediaModel } from 'database/models/Media/model.ts'
import type { media_statuses } from 'database/schemas'
import type { WithOptional } from '../../index'
import type { StatusModel } from '../Status/model'

export type MediaStatus = typeof media_statuses.$inferSelect
export type OptionalMediaStatus = WithOptional<
  MediaStatus,
  'mediaId' | 'statusId'
>
export type PartialMediaStatus = Omit<MediaStatus, 'mediaId' | 'statusId'> & {
  media: MediaModel
  status: StatusModel
}
