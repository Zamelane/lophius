import { InferSelectModel } from "drizzle-orm";
import { text, bigint, integer, pgTable, varchar, boolean, smallint, bigserial } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { countries } from "./countries";
import { languages } from "./languages";

export const translates = pgTable('translates', {
  overview: text(),
  runtime: smallint().notNull(),
  title: varchar({ length: 255 }),
  tagline: varchar({ length: 255 }),
  homepage: varchar({ length: 255 }),
  id: bigserial({ mode: 'number' }).primaryKey(),
  isOriginal: boolean().notNull().default(false),
  countryId: integer().notNull().references(() => countries.id),
  languageId: integer().notNull().references(() => languages.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
})

export type TranslatesTableType = InferSelectModel<typeof translates>