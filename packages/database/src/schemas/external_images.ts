import { relations } from 'drizzle-orm'
import {
  bigint,
  bigserial,
  decimal,
  index,
  integer,
  pgTable,
  unique,
  varchar
} from 'drizzle-orm/pg-core'

import { companies } from 'database/schemas/companies.ts'
import { external_backdrops } from 'database/schemas/external_backdrops.ts'
import { external_posters } from 'database/schemas/external_posters.ts'
import { external_domains } from './external_domains'
import { external_logos } from './external_logos'
import { languages } from './languages'
import { sources } from './sources'

export const external_images = pgTable(
  'external_images',
  {
    width: integer(),
    height: integer(),
    vote_avg: decimal(),
    vote_count: integer(),
    path: varchar({ length: 255 }).notNull(),
    id: bigserial({ mode: 'number' }).primaryKey(),
    languageId: integer().references(() => languages.id),
    externalDomainId: integer()
      .notNull()
      .references(() => external_domains.id),
    sourceId: bigint({ mode: 'number' })
      .references(() => sources.id)
      .notNull()
  },
  (table) => [
    unique().on(table.sourceId, table.path, table.externalDomainId),
    index().on(table.languageId),
    index().on(table.sourceId),
    index().on(table.languageId)
  ]
)

export type ExternalImagesTableType = typeof external_images.$inferSelect

export const externalImagesRelations = relations(
  external_images,
  ({ one, many }) => ({
    companies: many(companies),
    externalBackdrops: many(external_backdrops),
    externalPosters: many(external_posters),
    externalLogos: many(external_logos),
    language: one(languages, {
      fields: [external_images.languageId],
      references: [languages.id]
    }),
    externalDomain: one(external_domains, {
      fields: [external_images.externalDomainId],
      references: [external_domains.id]
    }),
    source: one(sources, {
      fields: [external_images.sourceId],
      references: [sources.id]
    })
  })
)
