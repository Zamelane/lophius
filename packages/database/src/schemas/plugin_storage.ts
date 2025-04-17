import {json, integer, pgTable, varchar} from "drizzle-orm/pg-core";

import { sources } from "./sources";
import {relations} from "drizzle-orm";
import {companies} from "database/schemas/companies.ts";
import {external_images} from "database/schemas/external_images.ts";

export const plugin_storage = pgTable('plugin_storage', {
  value: json().default(null),
  pluginName: varchar().notNull().unique(),
  sourceId: integer().references(() => sources.id).notNull().primaryKey()
})

export const pluginStorageRelations = relations(plugin_storage, ({ one, many }) => ({
  source: one(sources)
}))