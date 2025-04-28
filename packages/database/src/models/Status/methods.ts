import { queryOneResult } from "database/utils"
import { statuses } from "database/schemas"
import { StatusRepository } from "./repository"
import { StatusModel } from "./model"

/**
 * Операция Insert для модели UoW
 */
export async function insertStatus(
	this: StatusRepository,
	data: StatusModel
) {
	const status = data.status.toLocaleLowerCase()
	queryOneResult(
		await this.tx.insert(statuses)
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
      v => data.id = v.id
	)
}