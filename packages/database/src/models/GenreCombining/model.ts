import type { WithRequired } from '../../index'
import type { OptionalGenreCombining } from './type'

export class GenreCombiningModel implements OptionalGenreCombining {
  genreId?: OptionalGenreCombining['genreId']
  analogGenreId?: OptionalGenreCombining['analogGenreId']

  constructor(data: OptionalGenreCombining) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<
    OptionalGenreCombining,
    'genreId' | 'analogGenreId'
  > {
    if (!this.genreId || !this.analogGenreId)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
