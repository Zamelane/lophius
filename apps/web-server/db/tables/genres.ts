import { InferSelectModel } from "drizzle-orm";
import { serial, bigint, pgTable, varchar, integer, primaryKey } from "drizzle-orm/pg-core";

import { sources } from "./sources";

export const genres = pgTable('genres', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull().unique()
})

export const sourceGenres = pgTable('source_genres', {
  external_id: integer().notNull(),
  genreId: integer().references(() => genres.id).notNull(),
  sourceId: bigint({ mode: 'number' }).notNull().references(() => sources.id)
}, (table) => [
  primaryKey({ columns: [table.genreId, table.sourceId, table.external_id] })
])

export type GenresTableType = InferSelectModel<typeof genres>
export type SourceGenresTableType = InferSelectModel<typeof sourceGenres>