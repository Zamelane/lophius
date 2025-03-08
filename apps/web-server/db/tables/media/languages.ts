import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id:           serial().primaryKey(),
  code:         varchar({ length: 2 }).notNull(),
  name:         varchar({ length: 255 }),
  english_name: varchar({ length: 255 })
})