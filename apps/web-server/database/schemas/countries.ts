import { InferSelectModel } from "drizzle-orm";
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable('countries', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull(),
  iso_3166_1: varchar({ length: 2 }).notNull().unique()
})

export type CountriesTableType = InferSelectModel<typeof countries>