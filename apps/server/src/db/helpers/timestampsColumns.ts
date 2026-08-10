import { text } from "drizzle-orm/sqlite-core/columns";

export const timestamps = {
  updated_at: text(),
  created_at: text().$defaultFn(() => new Date().toISOString()).notNull(),
  deleted_at: text(),
}