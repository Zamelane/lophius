import type { WithRequired } from '../../index'
import { ExternalImageModel } from '../ExternalImage/model'
import { OptionalPeople, OptionalPeopleId } from './type'

export class PeopleModel implements OptionalPeople {
  id?: OptionalPeopleId
  name!: OptionalPeople['name']
  external_id!: OptionalPeople['external_id']
  sourceId!: OptionalPeople['sourceId']
  age!: OptionalPeople['age']
  gender!: OptionalPeople['gender']
  avatarExternalImageId?: OptionalPeople['avatarExternalImageId']

  avatar?: ExternalImageModel

  constructor(data: OptionalPeople) {
    Object.assign(this, data)
  }

  validateRequiredModels(): asserts this is WithRequired<
      OptionalPeople,
      'avatarExternalImageId'
    > {
      if (this.avatar) {
        this.avatar.validateRequiredIds()!
        this.avatarExternalImageId = this.avatar.id
      }
    }

  validateRequiredIds(): asserts this is WithRequired<OptionalPeople, 'id'> {
    if (!this.id) throw new Error('Missing required id')
  }
}
