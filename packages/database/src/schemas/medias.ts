import { WithOptional } from "../../../apps/web/interfaces";
import { InferSelectModel } from "drizzle-orm";
import { unique, pgTable, integer, boolean, varchar, bigserial } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import { media_types } from "./media_types";

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