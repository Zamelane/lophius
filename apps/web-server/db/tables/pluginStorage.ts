import {json, pgTable, varchar} from "drizzle-orm/pg-core";

export const pluginStorage = pgTable('plugin_storage', {
  pluginName: varchar().notNull().unique(),
  value: json().default(null)
})