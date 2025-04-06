import {InferSelectModel, relations} from "drizzle-orm"
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";
import {countryTranslations} from "database/schemas/country_translations.ts";
import {external_images} from "database/schemas/external_images.ts";
import {genre_translations} from "database/schemas/genre_translations.ts";
import {language_translations} from "database/schemas/language_translations.ts";

export const languages = pgTable('languages', {
  id: serial().primaryKey(),
  native_name: varchar({ length: 50 }),
  english_name: varchar({ length: 50 }),
  iso_639_1: varchar({ length: 2 }).notNull().unique()
})

export type LanguagesTableType = InferSelectModel<typeof languages>

export const languagesRelations = relations(languages, ({ one, many }) => ({
  languageTranslations: many(language_translations),
  countryTranslations: many(countryTranslations),
  genreTranslations: many(genre_translations),
  externalImages: many(external_images),
}))