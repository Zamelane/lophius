import {json, integer, pgTable, varchar} from "drizzle-orm/pg-core";

import { sources } from "./sources";
import {relations} from "drizzle-orm";

export const plugin_storage = pgTable('plugin_storage', {
  value: json().default(null),
  pluginName: varchar().notNull().unique(),
  sourceId: integer().references(() => sources.id).notNull().primaryKey()
})

export type PluginStorageTableType = typeof plugin_storage.$inferSelect

export const pluginStorageRelations = relations(plugin_storage, ({ one, many }) => ({
  source: one(sources, {
    references: [sources.id],
    fields: [plugin_storage.sourceId]
  })
}))