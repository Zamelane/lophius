import type { WithRequired } from '../../index'
import type { OptionalMediaGenre } from './type'

export class MediaGenreModel implements OptionalMediaGenre {
  mediaId?: OptionalMediaGenre['mediaId']
  genreId?: OptionalMediaGenre['genreId']
  genre!: OptionalMediaGenre['genre']
  media!: OptionalMediaGenre['media']

  constructor(data: OptionalMediaGenre) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalMediaGenre,
    'mediaId' | 'genreId'
  > {
    if (this.genre) {
      this.genre.validateRequiredIds()!
      this.genreId = this.genre.id
    }
    if (this.media) {
      this.media.validateRequiredIds()!
      this.mediaId = this.media.id
    }
    if (!this.mediaId || !this.genreId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
