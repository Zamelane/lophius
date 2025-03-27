import { InferSelectModel } from "drizzle-orm"
import { bigint, integer, pgTable } from "drizzle-orm/pg-core"

import { medias } from "./medias"

export const media_revenues = pgTable('media_revenues', {
  revenue: integer().notNull(),
  mediaId: bigint({ mode: 'number' }).references(() => medias.id).notNull().primaryKey()
})

export type MediaRevenuesTableType = InferSelectModel<typeof media_revenues>