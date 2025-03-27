import { InferSelectModel } from "drizzle-orm";
import { bigint, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { countries } from "./countries";

export const media_production_countries = pgTable('media_production_countries', {
  countryId: integer().notNull().references(() => countries.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
}, (table) => [
  primaryKey({
    columns: [table.countryId, table.mediaId]
  })
])

export type MediaProductionCountriesTableType = InferSelectModel<typeof media_production_countries>