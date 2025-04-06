import {InferSelectModel, relations} from "drizzle-orm"
import { bigint, integer, pgTable } from "drizzle-orm/pg-core"

import { medias } from "./medias"

export const media_revenues = pgTable('media_revenues', {
  revenue: integer().notNull(),
  mediaId: bigint({ mode: 'number' }).references(() => medias.id).notNull().primaryKey()
})

export type MediaRevenuesTableType = typeof media_revenues.$inferSelect

export const mediaRevenuesRelations = relations(media_revenues, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_revenues.mediaId],
    references: [medias.id]
  })
}))