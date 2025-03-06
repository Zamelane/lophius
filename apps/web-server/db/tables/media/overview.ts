import { bigint, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { languages, medias } from "./";
import { relations } from "drizzle-orm";

export const overviews = pgTable('overviews', {
	mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
	languageId: integer().notNull().references(() => languages.id),
	overview: text().notNull()
}, (table) => [
	primaryKey({ columns: [table.mediaId, table.languageId] })
])

export const overviewsRelations = relations(
	overviews, ({ one }) => ({
		media: one(medias, {
			fields: [overviews.mediaId],
			references: [medias.id]
		}),
		language: one(languages, {
			fields: [overviews.languageId],
			references: [languages.id]
		})
	})
)