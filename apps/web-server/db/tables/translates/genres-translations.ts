import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar, primaryKey } from "drizzle-orm/pg-core";

import { genres } from "../genres";
import { languages } from "../languages";

export const genresTranslations = pgTable('genres_translations', {
  value: varchar({ length: 30 }).notNull(),
  genreId: integer().notNull().references(() => genres.id),
  languageId: integer().notNull().references(() => languages.id)
}, (table) => [
  primaryKey({ columns: [table.languageId, table.genreId] })
])

export type GenresTranslationsTableType = InferSelectModel<typeof genresTranslations>