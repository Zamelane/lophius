import { integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { statuses } from "./statuses";
import {relations} from "drizzle-orm";

export const media_statuses = pgTable('media_statuses', {
  status: statuses().notNull(),
  mediaId: integer().notNull().references(() => medias.id).primaryKey()
})

export type MediaStatusesTableType = typeof media_statuses.$inferSelect

export const mediaStatusesRelations = relations(media_statuses, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_statuses.mediaId],
    references: [medias.id]
  })
}))