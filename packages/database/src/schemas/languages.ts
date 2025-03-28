import { InferSelectModel } from "drizzle-orm"
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id: serial().primaryKey(),
  native_name: varchar({ length: 50 }),
  english_name: varchar({ length: 50 }),
  iso_639_1: varchar({ length: 2 }).notNull().unique()
})

export type LanguagesTableType = InferSelectModel<typeof languages>