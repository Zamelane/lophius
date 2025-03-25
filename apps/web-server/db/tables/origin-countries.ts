import { InferSelectModel } from "drizzle-orm";
import { bigint, integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { countries } from "./countries";

export const originCountries = pgTable('origin_countries', {
  countryId: integer().notNull().references(() => countries.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
})

export type OriginCountriesTableType = InferSelectModel<typeof originCountries>