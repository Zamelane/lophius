import { relations } from 'drizzle-orm'
import { bigint, date, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { countries } from './countries'
import { medias } from './medias'

export const release_dates = pgTable(
  'release_dates',
  {
    date: date().notNull(),
    countryId: integer()
      .notNull()
      .references(() => countries.id),
    mediaId: bigint({ mode: 'number' })
      .notNull()
      .references(() => medias.id)
  },
  (table) => [
    primaryKey({
      columns: [table.countryId, table.mediaId]
    })
  ]
)

export type ReleaseDatesTableType = typeof release_dates.$inferSelect

export const releaseDatesRelations = relations(
  release_dates,
  ({ one, many }) => ({
    country: one(countries, {
      fields: [release_dates.countryId],
      references: [countries.id]
    }),
    media: one(medias, {
      fields: [release_dates.mediaId],
      references: [medias.id]
    })
  })
)
