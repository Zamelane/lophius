import { external_images } from 'database/schemas/external_images.ts'
import { relations } from 'drizzle-orm'
import { boolean, index, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const external_domains = pgTable(
  'external_domains',
  {
    id: serial().primaryKey(),
    https: boolean().notNull().default(true),
    domain: varchar({ length: 255 }).notNull().unique()
  },
  (table) => [index().on(table.https), index().on(table.domain)]
)

export type ExternalDomainsTableType = typeof external_domains.$inferSelect

export const externalDomainsRelations = relations(
  external_domains,
  ({ one, many }) => ({
    externalImages: many(external_images)
  })
)
