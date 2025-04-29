import type { WithOptional } from '../../index'
import type { statuses } from '../../schemas'

export type Status = typeof statuses.$inferSelect
export type OptionalStatus = WithOptional<Status, 'id'>
export type PartialStatus = Omit<Status, 'id'>
