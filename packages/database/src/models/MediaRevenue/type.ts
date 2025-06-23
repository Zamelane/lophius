import type { media_revenues } from 'database/schemas/media_revenues.ts'
import type { WithOptional } from '../../index'

export type MediaRevenue = typeof media_revenues.$inferSelect
export type OptionalMediaRevenue = WithOptional<MediaRevenue, 'mediaId'>
export type PartialMediaRevenue = Omit<MediaRevenue, 'mediaId'>
