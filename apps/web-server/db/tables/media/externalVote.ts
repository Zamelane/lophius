import { relations } from "drizzle-orm";
import { bigint, decimal, integer, pgTable } from "drizzle-orm/pg-core";
import { medias } from "./media";

export const externalVotes = pgTable('external_votes', {
  mediaId: bigint({ mode: 'number' }).primaryKey().references(() => medias.id),
  count: integer(),
  average: decimal({ scale: 2 }).notNull()
})

export const externalVotesRelations = relations(
  externalVotes, ({one}) => ({
      media: one(medias, {
        fields: [externalVotes.mediaId],
        references: [medias.id]
      })
  })
)