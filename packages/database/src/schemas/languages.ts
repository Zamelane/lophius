import {InferSelectModel, relations} from "drizzle-orm"
import { serial, pgTable, varchar, index } from "drizzle-orm/pg-core";
import {countryTranslations} from "database/schemas/country_translations.ts";
import {external_images} from "database/schemas/external_images.ts";
import {genre_translations} from "database/schemas/genre_translations.ts";
import {language_translations} from "database/schemas/language_translations.ts";
import {spoken_languages} from "database/schemas/spoken_languages.ts";
import {translates} from "database/schemas/translates.ts";

export const languages = pgTable('languages', {
  id: serial().primaryKey(),
  native_name: varchar({ length: 50 }),
  english_name: varchar({ length: 50 }),
  iso_639_1: varchar({ length: 2 }).notNull().unique()
}, (table) => [
  index("languages_iso_idx").on(table.iso_639_1),
])

export type LanguagesTableType = typeof languages.$inferSelect

export const languagesRelations = relations(languages, ({ one, many }) => ({
  languageTranslations: many(language_translations),
  countryTranslations: many(countryTranslations),
  genreTranslations: many(genre_translations),
  spokenLanguages: many(spoken_languages),
  externalImages: many(external_images),
  translates: many(translates),
}))