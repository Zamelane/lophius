import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable('countries', {
  id: integer().primaryKey(),
  iso_3166_1: varchar({ length: 2 }).notNull(),
  english_name: varchar({ length: 255 }).notNull(),
  native_name: varchar({ length: 255 }).notNull()
})