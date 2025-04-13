import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import {relations} from "drizzle-orm";
import { statuses } from "./statuses";

export const media_statuses = pgTable('media_statuses', {
  statusId: integer().notNull().references(() => statuses.id),
  mediaId: integer().notNull().references(() => medias.id).primaryKey()
})

export type MediaStatusesTableType = typeof media_statuses.$inferSelect

export const mediaStatusesRelations = relations(media_statuses, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_statuses.mediaId],
    references: [medias.id]
  }),
  status: one(statuses, {
    fields: [media_statuses.statusId],
    references: [statuses.id]
  })
}))