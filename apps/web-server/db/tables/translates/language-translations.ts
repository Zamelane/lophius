import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { languages } from "../";

export const languageTranslations = pgTable('languageTranslations', {
  value: varchar({ length: 30 }).notNull(),                                     // Перевод названия языка
  languageId: integer().primaryKey().references(() => languages.id).notNull(),  // Для какого языка перевод
  translateValueLanguageId: integer().references(() => languages.id).notNull()  // Сам перевод
})

export type LanguageTranslationsTableType = InferSelectModel<typeof languageTranslations>