import {json, pgTable, varchar} from "drizzle-orm/pg-core";

const pluginStorageTable = pgTable('plugin_storage', {
  pluginName: varchar().notNull().unique(),
  value: json().default(null)
})

export { pluginStorageTable }