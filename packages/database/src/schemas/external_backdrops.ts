import { relations } from 'drizzle-orm'
import { bigint, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { external_images } from './external_images'
import { medias } from './medias'

export const external_backdrops = pgTable(
  'external_backdrops',
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

export type ExternalBackdropsTableType = typeof external_backdrops.$inferSelect

export const externalBackdropsRelations = relations(
  external_backdrops,
  ({ one, many }) => ({
    media: one(medias, {
      fields: [external_backdrops.mediaId],
      references: [medias.id]
    }),
    externalImage: one(external_images, {
      fields: [external_backdrops.externalImageId],
      references: [external_images.id]
    })
  })
)
