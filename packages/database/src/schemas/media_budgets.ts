import {relations} from "drizzle-orm";
import { bigint, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";

export const media_budgets = pgTable('media_budgets', {
  budget: bigint({ mode: 'number' }).notNull(),
  mediaId: bigint({ mode: 'number' }).references(() => medias.id).notNull().primaryKey()
})

export type MediaBudgetsTableType = typeof media_budgets.$inferSelect

export const mediaBudgetsRelations = relations(media_budgets, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_budgets.mediaId],
    references: [medias.id]
  })
}))