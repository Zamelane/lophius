import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { people } from '../../schemas'
import { ExternalImageModel } from '../ExternalImage/model'

export type People = InferSelectModel<typeof people> & {
  avatar?: ExternalImageModel
}
export type OptionalPeople = WithOptional<People, 'id' | 'avatarExternalImageId'> 
export type PartialPeople = Omit<People, 'id' | 'avatarExternalImageId'>

export type PeopleId = People['id']
export type OptionalPeopleId = Partial<PeopleId>