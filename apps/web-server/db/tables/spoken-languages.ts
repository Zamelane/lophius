import { InferSelectModel } from "drizzle-orm";
import { bigint, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { languages } from "./languages";

export const spokenLanguages = pgTable('spoken_languages', {
  languageId: integer().notNull().references(() => languages.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
}, (table) => [
  primaryKey({ columns: [table.mediaId, table.languageId] })
])

export type SpokenLanguagesTableType = InferSelectModel<typeof spokenLanguages>