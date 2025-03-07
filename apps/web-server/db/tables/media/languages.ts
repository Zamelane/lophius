import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id:           serial().primaryKey(),
  iso_639_1:    varchar({ length: 2 }).notNull(),
  name:         varchar({ length: 255 }),
  english_name: varchar({ length: 255 })
})