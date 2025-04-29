import { integer, json, pgTable, varchar } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { sources } from './sources'

export const plugin_storage = pgTable('plugin_storage', {
  value: json().default(null),
  pluginName: varchar().notNull().unique(),
  sourceId: integer()
    .references(() => sources.id)
    .notNull()
    .primaryKey()
})

export type PluginStorageTableType = typeof plugin_storage.$inferSelect

export const pluginStorageRelations = relations(
  plugin_storage,
  ({ one, many }) => ({
    source: one(sources, {
      references: [sources.id],
      fields: [plugin_storage.sourceId]
    })
  })
)
