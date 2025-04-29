import { relations } from 'drizzle-orm'
import { bigint, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { external_images } from './external_images'
import { medias } from './medias'

export const external_logos = pgTable(
  'external_logos',
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

export type ExternalLogosTableType = typeof external_logos.$inferSelect

export const externalLogosRelations = relations(
  external_logos,
  ({ one, many }) => ({
    media: one(medias, {
      fields: [external_logos.mediaId],
      references: [medias.id]
    }),
    externalImage: one(external_images, {
      fields: [external_logos.externalImageId],
      references: [external_images.id]
    })
  })
)
