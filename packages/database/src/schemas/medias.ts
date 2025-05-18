import type { WithOptional } from 'database/utils'
import { relations } from 'drizzle-orm'
import {
  bigserial,
  boolean,
  index,
  integer,
  pgTable,
  unique,
  varchar
} from 'drizzle-orm/pg-core'

import { external_backdrops } from 'database/schemas/external_backdrops.ts'
import { external_posters } from 'database/schemas/external_posters.ts'
import { media_budgets } from 'database/schemas/media_budgets.ts'
import { media_genres } from 'database/schemas/media_genres.ts'
import { media_production_companies } from 'database/schemas/media_production_companies.ts'
import { media_production_countries } from 'database/schemas/media_production_countries.ts'
import { media_revenues } from 'database/schemas/media_revenues.ts'
import { media_statuses } from 'database/schemas/media_statuses.ts'
import { media_votes } from 'database/schemas/media_votes.ts'
import { origin_countries } from 'database/schemas/origin_countries.ts'
import { release_dates } from 'database/schemas/release_dates.ts'
import { spoken_languages } from 'database/schemas/spoken_languages.ts'
import { external_logos } from './external_logos'
import { media_types } from './media_types'
import { sources } from './sources'
import { translates } from './translates'

export const medias = pgTable(
  'medias',
  {
    isVideo: boolean(),
    mediaType: media_types().notNull(),
    isAdult: boolean().notNull().default(true),
    id: bigserial({ mode: 'number' }).primaryKey(),
    external_id: varchar({ length: 255 }).notNull(),
    sourceId: integer()
      .references(() => sources.id)
      .notNull()
  },
  (table) => [
    unique().on(table.sourceId, table.external_id),
    index().on(table.sourceId)
  ]
)

export type MediasTableType = typeof medias.$inferSelect
export type Media = WithOptional<MediasTableType, 'id'>

export const mediasRelations = relations(medias, ({ one, many }) => ({
  translates: many(translates),
  externalLogos: many(external_logos),
  externalBackdrops: many(external_backdrops),
  mediaProductionCompanies: many(media_production_companies),
  mediaProductionCountries: many(media_production_countries),
  externalPosters: many(external_posters),
  originCountries: many(origin_countries),
  spokenLanguages: many(spoken_languages),
  releaseDates: many(release_dates),
  mediaGenres: many(media_genres),
  mediaBudget: one(media_budgets),
  mediaRevenue: one(media_revenues),
  mediaStatus: one(media_statuses),
  mediaVote: one(media_votes),
  source: one(sources, {
    fields: [medias.sourceId],
    references: [sources.id]
  })
}))
