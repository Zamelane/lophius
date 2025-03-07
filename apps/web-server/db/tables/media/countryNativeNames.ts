import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { countries } from "./countries";
import { languages } from "./languages";

export const countryNativeNames = pgTable('country_native_names', {
  countryId: integer().notNull().references(() => countries.id),
  languageId: integer().notNull().references(() => languages.id),
  native_name: varchar({ length: 255 }).notNull()
}, (table) => [
  primaryKey({ columns: [table.countryId, table.languageId] })
])