import { companies } from 'database/schemas/companies.ts'
import { external_images } from 'database/schemas/external_images.ts'
import { plugin_storage } from 'database/schemas/plugin_storage.ts'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, serial } from 'drizzle-orm/pg-core'
import { medias } from './medias'

export const sourceType = pgEnum('source_type', ['user', 'parser'])

export const sources = pgTable('sources', {
  type: sourceType().notNull(),
  id: serial().notNull().primaryKey()
})

export type SourcesTableType = typeof sources.$inferSelect

export const sourcesRelations = relations(sources, ({ one, many }) => ({
  companies: many(companies),
  externalImages: many(external_images),
  medias: many(medias),
  pluginStorage: one(plugin_storage)
}))
