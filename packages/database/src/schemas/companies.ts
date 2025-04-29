import { relations } from 'drizzle-orm'
import {
  type AnyPgColumn,
  bigint,
  bigserial,
  integer,
  pgTable,
  text,
  unique,
  varchar
} from 'drizzle-orm/pg-core'

import { media_production_companies } from 'database/schemas/media_production_companies.ts'
import { countries } from './countries'
import { external_images } from './external_images'
import { sources } from './sources'

export const companies = pgTable(
  'companies',
  {
    description: text(),
    homepage: varchar({ length: 255 }),
    name: varchar({ length: 255 }).notNull(),
    id: bigserial({ mode: 'number' }).primaryKey(),
    external_id: varchar({ length: 255 }).notNull(),
    originCountryId: integer().references(() => countries.id),
    sourceId: bigint({ mode: 'number' })
      .notNull()
      .references(() => sources.id),
    logoExternalFileId: bigint({ mode: 'number' }).references(
      () => external_images.id
    ),
    parentCompanyId: bigint({ mode: 'number' }).references(
      (): AnyPgColumn => companies.id
    )
  },
  (table) => [unique().on(table.external_id, table.sourceId)]
)

export type CompaniesTableType = typeof companies.$inferSelect

export const companiesRelations = relations(companies, ({ one, many }) => ({
  originCountry: one(countries, {
    fields: [companies.originCountryId],
    references: [countries.id]
  }),
  source: one(sources, {
    fields: [companies.sourceId],
    references: [sources.id]
  }),
  logoExternalFile: one(external_images, {
    fields: [companies.logoExternalFileId],
    references: [external_images.id]
  }),
  parentCompany: one(companies, {
    fields: [companies.parentCompanyId],
    references: [companies.id]
  }),
  childrenCompanies: many(companies),
  mediaProductionCompanies: many(media_production_companies)
}))
