import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable('countries', {
  id: serial().primaryKey(),
  iso_3166_1: varchar({ length: 2 }).notNull(),
  english_name: varchar({ length: 255 })
})