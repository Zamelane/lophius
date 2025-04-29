import type { OptionalMediaStatus } from 'database/models/MediaStatus/type.ts'
import type { WithRequired } from '../../index'

export class MediaStatusModel implements OptionalMediaStatus {
  mediaId?: OptionalMediaStatus['mediaId']
  statusId?: OptionalMediaStatus['statusId']

  constructor(data: OptionalMediaStatus) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalMediaStatus,
    'mediaId'
  > {
    if (!this.mediaId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
