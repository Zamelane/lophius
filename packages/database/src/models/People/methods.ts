import { people } from 'database/schemas'
import { queryOneResult } from 'database/utils'
import type { PeopleRepository } from './repository'
import { PeopleModel } from './model'

/**
 * Операция Insert для модели UoW
 */
export async function insertPeople(this: PeopleRepository, data: PeopleModel) {
  data.validateRequiredModels()
  queryOneResult(
    await this.tx
      .insert(people)
      .values(data)
      .onConflictDoUpdate({
        target: [people.sourceId, people.external_id],
        set: data
      })
      .returning(),
    (v) => {
      data.id = v.id
    }
  )
}
