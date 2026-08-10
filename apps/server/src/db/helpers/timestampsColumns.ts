import { text } from "drizzle-orm/sqlite-core";

export const timestamps = {
  created_at: text()
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updated_at: text()
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
  deleted_at: text(),
};
