import type { OptionalReleaseDate } from 'database/models/ReleaseDate/type.ts'
import type { WithRequired } from '../../index'

export class ReleaseDateModel implements OptionalReleaseDate {
  mediaId?: OptionalReleaseDate['mediaId']
  countryId?: OptionalReleaseDate['countryId']
  date!: OptionalReleaseDate['date']

  constructor(data: OptionalReleaseDate) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalReleaseDate,
    'mediaId' | 'countryId'
  > {
    if (!this.mediaId && !this.countryId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
