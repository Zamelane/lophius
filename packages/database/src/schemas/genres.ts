import { relations } from 'drizzle-orm'
import {
  bigint,
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar
} from 'drizzle-orm/pg-core'

import { genre_translations } from 'database/schemas/genre_translations.ts'
import { genres_combining } from 'database/schemas/genres_combining.ts'
import { media_genres } from 'database/schemas/media_genres.ts'
import { sources } from './sources'

export const genres = pgTable('genres', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull().unique()
})

export const source_genres = pgTable(
  'source_genres',
  {
    external_id: varchar({ length: 255 }).notNull(),
    genreId: integer()
      .references(() => genres.id)
      .notNull(),
    sourceId: bigint({ mode: 'number' })
      .notNull()
      .references(() => sources.id)
  },
  (table) => [
    primaryKey({ columns: [table.genreId, table.sourceId, table.external_id] })
  ]
)

export type GenresTableType = typeof genres.$inferSelect
export type SourceGenresTableType = typeof source_genres.$inferSelect

export const genresRelations = relations(genres, ({ one, many }) => ({
  sourceGenres: many(source_genres),
  genreCombining: many(genres_combining),
  genreTranslations: many(genre_translations),
  mediaGenres: many(media_genres)
}))

export const sourceGenresRelations = relations(
  source_genres,
  ({ one, many }) => ({
    genre: one(genres, {
      fields: [source_genres.genreId],
      references: [genres.id]
    }),
    source: one(sources, {
      fields: [source_genres.sourceId],
      references: [sources.id]
    })
  })
)
