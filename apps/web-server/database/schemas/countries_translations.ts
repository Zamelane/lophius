import { integer, pgTable, varchar, primaryKey } from "drizzle-orm/pg-core";

import { languages } from "./languages";
import { countries } from "./countries";

export const countryTranslations = pgTable('country_translations', {
  value: varchar({ length: 30 }).notNull(),
  countryId: integer().references(() => countries.id).notNull(),
  languageId: integer().references(() => languages.id).notNull()
}, (table) => [
  primaryKey({ columns: [table.countryId, table.languageId] })
])