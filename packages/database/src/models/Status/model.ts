import type { WithRequired } from '../../index'
import type { OptionalStatus } from './type'

export class StatusModel implements OptionalStatus {
  id?: OptionalStatus['id']
  status!: OptionalStatus['status']

  constructor(data: OptionalStatus) {
    Object.assign(this, data)
  }

  validateRequiredIds(): asserts this is WithRequired<OptionalStatus, 'id'> {
    if (!this.id)
      throw new Error(`Missing required fields: ${this.constructor.name}`)
  }
}
