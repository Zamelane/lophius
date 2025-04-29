import { relations } from 'drizzle-orm'
import { bigint, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { external_images } from './external_images'
import { medias } from './medias'

export const external_posters = pgTable(
  'external_posters',
  {
    mediaId: bigint({ mode: 'number' })
      .notNull()
      .references(() => medias.id),
    externalImageId: bigint({ mode: 'number' })
      .notNull()
      .references(() => external_images.id)
  },
  (table) => [primaryKey({ columns: [table.externalImageId, table.mediaId] })]
)

export type ExternalPostersTableType = typeof external_posters.$inferSelect

export const externalPostersRelations = relations(
  external_posters,
  ({ one, many }) => ({
    media: one(medias, {
      fields: [external_posters.mediaId],
      references: [medias.id]
    }),
    externalImage: one(external_images, {
      fields: [external_posters.externalImageId],
      references: [external_images.id]
    })
  })
)
