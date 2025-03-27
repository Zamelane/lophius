import { InferSelectModel } from "drizzle-orm";
import { text, bigint, unique, pgTable, varchar, integer, bigserial, AnyPgColumn } from "drizzle-orm/pg-core";

import { sources } from "./sources";
import { countries } from "./countries";
import { external_images } from "./external_images";

export const companies = pgTable('companies', {
  description: text(),
  homepage: varchar({ length: 255 }),
  name: varchar({ length: 255 }).notNull(),
  id: bigserial({ mode: "number" }).primaryKey(),
  external_id: varchar({ length: 255 }).notNull(),
  originCountryId: integer().references(() => countries.id),
  sourceId: bigint({ mode: 'number' }).notNull().references(() => sources.id),
  logoExternalFileId: bigint({ mode: 'number' }).references(() => external_images.id),
  parentCompanyId: bigint({ mode: 'number' }).references((): AnyPgColumn => companies.id)
}, (table) => [
  unique().on(table.external_id, table.sourceId)
])

export type CompaniesTableType = InferSelectModel<typeof companies>