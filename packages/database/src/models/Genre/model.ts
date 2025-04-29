import type { WithRequired } from '../../index'
import type { OptionalGenre, OptionalGenreId } from './type'

export class GenreModel implements OptionalGenre {
  id?: OptionalGenreId
  english_name!: OptionalGenre['english_name']

  constructor(data: OptionalGenre) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<OptionalGenre, 'id'> {
    if (!this.id)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
