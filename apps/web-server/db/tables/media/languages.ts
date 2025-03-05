import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id:           serial().primaryKey(),
  iso_3166_1:   varchar({ length: 2 }).notNull(),
  iso_639_1:    varchar({ length: 2 }).notNull(),
  name:         varchar({ length: 255 }).notNull(),
  english_name: varchar({ length: 255 }).notNull()
})