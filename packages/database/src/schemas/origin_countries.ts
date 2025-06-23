import { relations } from 'drizzle-orm'
import { bigint, integer, pgTable } from 'drizzle-orm/pg-core'

import { countries } from './countries'
import { medias } from './medias'

export const origin_countries = pgTable('origin_countries', {
  countryId: integer()
    .notNull()
    .references(() => countries.id),
  mediaId: bigint({ mode: 'number' })
    .notNull()
    .references(() => medias.id)
})

export type OriginCountriesTableType = typeof origin_countries.$inferSelect

export const originCountriesRelations = relations(
  origin_countries,
  ({ one, many }) => ({
    country: one(countries, {
      fields: [origin_countries.countryId],
      references: [countries.id]
    }),
    media: one(medias, {
      fields: [origin_countries.mediaId],
      references: [medias.id]
    })
  })
)
