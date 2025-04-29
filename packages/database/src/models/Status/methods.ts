import { statuses } from 'database/schemas'
import { queryOneResult } from 'database/utils'
import type { StatusModel } from './model'
import type { StatusRepository } from './repository'

/**
 * Операция Insert для модели UoW
 */
export async function insertStatus(this: StatusRepository, data: StatusModel) {
  const status = data.status.toLocaleLowerCase()
  queryOneResult(
    await this.tx
      .insert(statuses)
      .values({
        status
      })
      .onConflictDoUpdate({
        target: statuses.status,
        set: {
          status
        }
      })
      .returning(),
    (v) => (data.id = v.id)
  )
}
