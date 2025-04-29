import type { OptionalMediaVote } from 'database/models/MediaVote/type.ts'
import type { WithRequired } from '../../index'

export class MediaVoteModel implements OptionalMediaVote {
  mediaId?: OptionalMediaVote['mediaId']
  avg!: OptionalMediaVote['avg']
  avg_max!: OptionalMediaVote['avg_max']
  count!: OptionalMediaVote['count']

  constructor(data: OptionalMediaVote) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalMediaVote,
    'mediaId'
  > {
    if (!this.mediaId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
