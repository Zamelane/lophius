import {json, integer, pgTable, varchar} from "drizzle-orm/pg-core";

import { sources } from "./sources";

export const pluginStorage = pgTable('plugin_storage', {
  value: json().default(null),
  pluginName: varchar().notNull().unique(),
  sourceId: integer().references(() => sources.id).notNull().primaryKey()
})