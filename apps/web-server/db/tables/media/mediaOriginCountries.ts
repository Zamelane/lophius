import { bigint, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { medias } from "./media";
import { countries } from "./countries";

export const originCountries = pgTable('media_origin_countries', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  countryId: integer().notNull().references(() => countries.id)
}, (table) => [
  primaryKey({ columns: [table.mediaId, table.countryId] })
])