import { relations } from 'drizzle-orm'
import {
  bigint,
  bigserial,
  boolean,
  index,
  integer,
  pgTable,
  smallint,
  text,
  varchar
} from 'drizzle-orm/pg-core'

import { countries } from './countries'
import { languages } from './languages'
import { medias } from './medias'

export const translates = pgTable(
  'translates',
  {
    overview: text(),
    runtime: smallint().notNull(),
    title: varchar({ length: 512 }),
    tagline: varchar({ length: 256 }),
    homepage: varchar({ length: 1024 }),
    id: bigserial({ mode: 'number' }).primaryKey(),
    isOriginal: boolean().notNull().default(false),
    countryId: integer().references(() => countries.id),
    languageId: integer()
      .notNull()
      .references(() => languages.id),
    mediaId: bigint({ mode: 'number' })
      .notNull()
      .references(() => medias.id)
  },
  (table) => [
    index().on(table.countryId),
    index().on(table.languageId),
    index().on(table.mediaId)
    //index('index_translates_on_title_trgm').using('gin', sql`${table.title} gin_trgm_ops`)
    //CREATE INDEX CONCURRENTLY index_translates_on_title_trgm ON translates USING gin (title gin_trgm_ops);
  ]
)

export type TranslatesTableType = typeof translates.$inferSelect

export const translatesRelations = relations(translates, ({ one }) => ({
  country: one(countries, {
    fields: [translates.countryId],
    references: [countries.id]
  }),
  language: one(languages, {
    fields: [translates.languageId],
    references: [languages.id]
  }),
  media: one(medias, {
    fields: [translates.mediaId],
    references: [medias.id]
  })
}))
