import { InferSelectModel } from "drizzle-orm";
import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const genres = pgTable('genres', {
  id: serial().primaryKey(),
  english_name: varchar({ length: 30 }).notNull().unique()
})

export type GenresTableType = InferSelectModel<typeof genres>