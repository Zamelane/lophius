import { relations } from "drizzle-orm";
import { bigint, pgTable } from "drizzle-orm/pg-core";
import { medias } from "./media";

export const revenues = pgTable('revenues', {
  mediaId: bigint({ mode: 'number' }).notNull().primaryKey().references(() => medias.id),
  value: bigint({ mode: 'number' }).notNull()
})

export const revenuesRelations = relations(
  revenues, ({ one }) => ({
    media: one(medias, {
      fields: [revenues.mediaId],
      references: [medias.id]
    })
  })
)