import { relations } from "drizzle-orm";
import { bigint, pgTable } from "drizzle-orm/pg-core";
import { medias } from "./media";

export const budgets = pgTable('budgets', {
  mediaId: bigint({ mode: 'number' }).notNull().primaryKey().references(() => medias.id),
  value: bigint({ mode: 'number' }).notNull()
})

export const budgetsRelations = relations(
  budgets, ({ one }) => ({
    media: one(medias, {
      fields: [budgets.mediaId],
      references: [medias.id]
    })
  })
)