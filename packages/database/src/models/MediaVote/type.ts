import type { MediaModel } from 'database/models/Media/model.ts'
import type { media_votes } from 'database/schemas'
import type { WithOptional } from '../../index'

export type MediaVote = typeof media_votes.$inferSelect
export type OptionalMediaVote = WithOptional<MediaVote, 'mediaId'>
export type PartialMediaVote = Omit<MediaVote, 'mediaId'> & {
  media: MediaModel
}
