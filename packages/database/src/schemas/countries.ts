import {relations} from "drizzle-orm";
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";
import {companies} from "database/schemas/companies.ts";
import {countryTranslations} from "database/schemas/country_translations.ts";
import {media_production_countries} from "database/schemas/media_production_countries.ts";
import {origin_countries} from "database/schemas/origin_countries.ts";
import {release_dates} from "database/schemas/release_dates.ts";
import {translates} from "database/schemas/translates.ts";

export const countries = pgTable('countries', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }),
  iso_3166_1: varchar({ length: 2 }).notNull().unique()
})

export type CountriesTableType = typeof countries.$inferSelect

export const countriesRelations = relations(countries, ({ one, many }) => ({
  companies: many(companies),
  translates: many(translates),
  countryTranslations: many(countryTranslations),
  mediaProductionCountries: many(media_production_countries),
  originCountries: many(origin_countries),
  releaseDates: many(release_dates),
}))