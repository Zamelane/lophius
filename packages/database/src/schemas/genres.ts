import {InferSelectModel, relations} from "drizzle-orm";
import { serial, bigint, pgTable, varchar, integer, primaryKey } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import {genres_combining} from "database/schemas/genres_combining.ts";
import {genre_translations} from "database/schemas/genre_translations.ts";

export const genres = pgTable('genres', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull().unique()
})

export const sourceGenres = pgTable('source_genres', {
  external_id: varchar({ length: 255 }).notNull(),
  genreId: integer().references(() => genres.id).notNull(),
  sourceId: bigint({ mode: 'number' }).notNull().references(() => sources.id)
}, (table) => [
  primaryKey({ columns: [table.genreId, table.sourceId, table.external_id] })
])

export type GenresTableType = InferSelectModel<typeof genres>
export type SourceGenresTableType = InferSelectModel<typeof sourceGenres>

export const genresRelations = relations(genres, ({ one, many }) => ({
  sourceGenres: many(sourceGenres),
  genreCombining: many(genres_combining),
  genreTranslations: many(genre_translations)
}))

export const sourceGenresRelations = relations(sourceGenres, ({ one, many }) => ({
  genre: one(genres, {
    fields: [sourceGenres.genreId],
    references: [genres.id]
  }),
  source: one(sources, {
    fields: [sourceGenres.sourceId],
    references: [sources.id]
  })
}))