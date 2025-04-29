import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { countries } from './countries'
import { languages } from './languages'

export const countryTranslations = pgTable(
  'country_translations',
  {
    value: varchar({ length: 30 }).notNull(),
    countryId: integer()
      .references(() => countries.id)
      .notNull(),
    languageId: integer()
      .references(() => languages.id)
      .notNull()
  },
  (table) => [primaryKey({ columns: [table.countryId, table.languageId] })]
)

export type CountryTranslationsTableType =
  typeof countryTranslations.$inferSelect

export const countryTranslationsRelations = relations(
  countryTranslations,
  ({ one, many }) => ({
    country: one(countries, {
      fields: [countryTranslations.countryId],
      references: [countries.id]
    }),
    language: one(languages, {
      fields: [countryTranslations.languageId],
      references: [languages.id]
    })
  })
)
