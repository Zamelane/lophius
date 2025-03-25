import { integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { statuses } from "./statuses";

export const mediaStatuses = pgTable('media_statuses', {
  status: statuses().notNull(),
  mediaId: integer().notNull().references(() => medias.id).primaryKey()
})