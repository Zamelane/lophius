import { InferSelectModel } from "drizzle-orm";
import { decimal, integer, pgTable, bigserial } from "drizzle-orm/pg-core";

import { medias } from "./medias";

export const media_votes = pgTable('media_votes', {
  count: integer(),
  avg: decimal().notNull(),
  avg_max: decimal().notNull(),
  mediaId: bigserial({ mode: 'number' }).references(() => medias.id).notNull().primaryKey()
})

export type MediaVotesTableType = InferSelectModel<typeof media_votes>