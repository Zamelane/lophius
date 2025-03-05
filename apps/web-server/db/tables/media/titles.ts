import { bigint, boolean, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { medias } from "./media";
import { languages } from "./languages";
import { relations } from "drizzle-orm";

export const titles = pgTable('titles', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  languageId: integer().notNull().references(() => languages.id),
  title: varchar({ length: 255 }).notNull(),
  isOriginal: boolean().default(false)
}, (table) => [
  primaryKey({ columns: [table.mediaId, table.languageId] })
])

export const titlesRelations = relations(
  titles, ({one}) => ({
    media: one(medias, {
      fields: [titles.mediaId],
      references: [medias.id]
    }),
    language: one(languages, {
      fields: [titles.languageId],
      references: [languages.id]
    })
  })
)