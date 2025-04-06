import {InferSelectModel, relations} from "drizzle-orm";
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

export type MediaProductionCountriesTableType = typeof media_production_countries.$inferSelect

export const mediaProductionCountriesRelations = relations(media_production_countries, ({ one, many }) => ({
  country: one(countries, {
    fields: [media_production_countries.countryId],
    references: [countries.id]
  }),
  media: one(medias, {
    fields: [media_production_countries.mediaId],
    references: [medias.id]
  })
}))