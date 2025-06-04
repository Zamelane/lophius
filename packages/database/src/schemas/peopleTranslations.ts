import { bigint, bigserial, boolean, integer, pgTable, primaryKey, text, unique, varchar } from "drizzle-orm/pg-core";
import { people } from "./people";
import { languages } from "./languages";
import { countries } from "./countries";

export const peopleTranslations = pgTable('people_translations', {
  peopleId: bigint({ mode: 'number' })
    .references(() => people.id)
    .notNull(),
  languageId: integer()
    .references(() => languages.id),
  countryId: integer()
    .references(() => countries.id),
  name: varchar({ length: 255 }),
  bio: text(),
  primary: boolean()
}, table => [
  unique().on(table.languageId, table.peopleId, table.countryId)
])

export type PeopleTranslationsTableType = typeof peopleTranslations.$inferSelect
export type PeopleTranslationsTableInsertType = typeof peopleTranslations.$inferInsert