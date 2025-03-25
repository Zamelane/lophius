import { InferSelectModel } from "drizzle-orm";
import { unique, integer, pgTable, varchar, decimal, bigserial } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import { languages } from "./languages";
import { externalDomains } from "./external-domains";

export const externalImages = pgTable('external_images', {
  width: integer(),
  height: integer(),
  vote_avg: decimal(),
  vote_count: integer(),
  path: varchar({ length: 255 }).notNull(),
  id: bigserial({ mode: 'number' }).primaryKey(),
  languageId: integer().references(() => languages.id),
  externalDomainId: integer().notNull().references(() => externalDomains.id),
  sourceId: bigserial({ mode: 'number' }).references(() => sources.id).notNull()
}, (table) => [
  unique().on(table.sourceId, table.path, table.externalDomainId)
])

export type ExternalImagesTableType = InferSelectModel<typeof externalImages>