import type { WithRequired } from '../../index'
import type { OptionalCountry, OptionalCountryId } from './type'

export class CountryModel implements OptionalCountry {
  id?: OptionalCountryId
  english_name!: OptionalCountry['english_name']
  iso_3166_1!: OptionalCountry['iso_3166_1']

  constructor(data: OptionalCountry) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<OptionalCountry, 'id'> {
    if (!this.id) throw new Error('Missing required id')
  }
}
