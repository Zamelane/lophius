import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { media_budgets } from '../../schemas'

export type MediaBudget = InferSelectModel<typeof media_budgets>
export type OptionalMediaBudget = WithOptional<MediaBudget, 'mediaId'>
export type PartialMediaBudget = Omit<MediaBudget, 'mediaId'>
