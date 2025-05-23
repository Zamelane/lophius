import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'

import { genres } from './genres'
import { languages } from './languages'

export const genre_translations = pgTable(
  'genres_translations',
  {
    value: varchar({ length: 30 }).notNull(),
    genreId: integer()
      .notNull()
      .references(() => genres.id),
    languageId: integer()
      .notNull()
      .references(() => languages.id)
  },
  (table) => [primaryKey({ columns: [table.languageId, table.genreId] })]
)

export type GenresTranslationsTableType = typeof genre_translations.$inferSelect

export const genresTranslationsRelations = relations(
  genre_translations,
  ({ one, many }) => ({
    genre: one(genres, {
      fields: [genre_translations.genreId],
      references: [genres.id]
    }),
    language: one(languages, {
      fields: [genre_translations.languageId],
      references: [languages.id]
    })
  })
)
