import { InferSelectModel } from "drizzle-orm";
import { unique, bigint, integer, pgTable, varchar, decimal, bigserial } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import { languages } from "./languages";
import { external_domains } from "./external_domains";

export const external_images = pgTable('external_images', {
  width: integer(),
  height: integer(),
  vote_avg: decimal(),
  vote_count: integer(),
  path: varchar({ length: 255 }).notNull(),
  id: bigserial({ mode: 'number' }).primaryKey(),
  languageId: integer().references(() => languages.id),
  externalDomainId: integer().notNull().references(() => external_domains.id),
  sourceId: bigint({ mode: 'number' }).references(() => sources.id).notNull()
}, (table) => [
  unique().on(table.sourceId, table.path, table.externalDomainId)
])

export type ExternalImagesTableType = InferSelectModel<typeof external_images>