import { InferSelectModel } from "drizzle-orm"
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull(),
  iso_639_1: varchar({ length: 2 }).notNull().unique()
})

export type LanguagesTableType = InferSelectModel<typeof languages>