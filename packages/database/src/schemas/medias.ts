import { WithOptional } from "database/utils";
import { InferSelectModel, relations } from "drizzle-orm";
import { unique, pgTable, integer, boolean, varchar, bigserial } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import { media_types } from "./media_types";
import { translates } from "./translates";
import {external_backdrops} from "database/schemas/external_backdrops.ts";
import {external_posters} from "database/schemas/external_posters.ts";
import {media_budgets} from "database/schemas/media_budgets.ts";

export const medias = pgTable('medias', {
  isVideo: boolean(),
  mediaType: media_types().notNull(),
  isAdult: boolean().notNull().default(true),
  id: bigserial({ mode: "number" }).primaryKey(),
  external_id: varchar({ length: 255 }).notNull(),
  sourceId: integer().references(() => sources.id).notNull()
}, (table) => [
  unique().on(table.sourceId, table.external_id)
])

export type MediasTableType = InferSelectModel<typeof medias>
export type Media = WithOptional<MediasTableType, 'id'>

export const mediasRelations = relations(medias, ({ one, many }) => ({
  translates: many(translates),
  externalBackdrops: many(external_backdrops),
  externalPosters: many(external_posters),
  mediaBudget: one(media_budgets),
  source: one(sources, {
    fields: [medias.sourceId],
    references: [sources.id]
  }),
}))