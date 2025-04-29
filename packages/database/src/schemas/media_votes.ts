import { relations } from 'drizzle-orm'
import { bigserial, decimal, integer, pgTable } from 'drizzle-orm/pg-core'

import { medias } from './medias'

export const media_votes = pgTable('media_votes', {
  count: integer(),
  avg: decimal().notNull(),
  avg_max: decimal().notNull(),
  mediaId: bigserial({ mode: 'number' })
    .references(() => medias.id)
    .notNull()
    .primaryKey()
})

export type MediaVotesTableType = typeof media_votes.$inferSelect

export const mediaVotesRelations = relations(media_votes, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_votes.mediaId],
    references: [medias.id]
  })
}))
