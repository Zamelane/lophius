import {InferSelectModel, relations} from "drizzle-orm";
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";
import {companies} from "database/schemas/companies.ts";
import {countryTranslations} from "database/schemas/country_translations.ts";

export const countries = pgTable('countries', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }),
  iso_3166_1: varchar({ length: 2 }).notNull().unique()
})

export type CountriesTableType = InferSelectModel<typeof countries>

export const countriesRelations = relations(countries, ({ one, many }) => ({
  companies: many(companies),
  countryTranslations: many(countryTranslations),
}))