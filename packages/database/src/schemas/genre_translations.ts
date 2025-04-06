import {InferSelectModel, relations} from "drizzle-orm";
import { integer, pgTable, varchar, primaryKey } from "drizzle-orm/pg-core";

import { genres } from "./genres";
import { languages } from "./languages";

export const genre_translations = pgTable('genres_translations', {
  value: varchar({ length: 30 }).notNull(),
  genreId: integer().notNull().references(() => genres.id),
  languageId: integer().notNull().references(() => languages.id)
}, (table) => [
  primaryKey({ columns: [table.languageId, table.genreId] })
])

export type GenresTranslationsTableType = InferSelectModel<typeof genre_translations>

export const genresTranslationsRelations = relations(genre_translations, ({ one, many }) => ({
  genre: one(genres, {
    fields: [genre_translations.genreId],
    references: [genres.id]
  }),
  language: one(languages, {
    fields: [genre_translations.languageId],
    references: [languages.id]
  })
}))