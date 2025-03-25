import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar, bigserial } from "drizzle-orm/pg-core";

import { externalDomains } from "./external_domains";

export const externalFiles = pgTable('external_files', {
  path: varchar({ length: 255 }).notNull(),
  id: bigserial({ mode: 'number' }).primaryKey(),
  external_domain: integer().notNull().references(() => externalDomains.id)
})

export type ExternalFilesTableType = InferSelectModel<typeof externalFiles>