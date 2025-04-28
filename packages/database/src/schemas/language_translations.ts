import {InferSelectModel, relations} from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import {languages} from "./index";

export const language_translations = pgTable('language_translations', {
  value: varchar({ length: 30 }).notNull(),                                     // Перевод названия языка
  languageId: integer().primaryKey().references(() => languages.id).notNull(),  // Для какого языка перевод
  translateValueLanguageId: integer().references(() => languages.id).notNull()  // Сам перевод
})

export type LanguageTranslationsTableType = typeof language_translations.$inferSelect

export const languageTranslationsRelations = relations(language_translations, ({ one, many }) => ({
  language: one(languages, {
    fields: [language_translations.languageId],
    references: [languages.id]
  }),
  translateValueLanguage: one(languages, {
    fields: [language_translations.translateValueLanguageId],
    references: [languages.id]
  })
}))