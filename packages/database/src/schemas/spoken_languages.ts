import {InferSelectModel, relations} from "drizzle-orm";
import { bigint, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { languages } from "./languages";

export const spoken_languages = pgTable('spoken_languages', {
  languageId: integer().notNull().references(() => languages.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
}, (table) => [
  primaryKey({ columns: [table.mediaId, table.languageId] })
])

export type SpokenLanguagesTableType = typeof spoken_languages.$inferSelect

export const spokenLanguagesRelations = relations(spoken_languages, ({ one, many }) => ({
  language: one(languages, {
    fields: [spoken_languages.languageId],
    references: [languages.id]
  }),
  media: one(medias, {
    fields: [spoken_languages.mediaId],
    references: [medias.id]
  })
}))