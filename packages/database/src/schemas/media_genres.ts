import {InferSelectModel, relations} from "drizzle-orm";
import { bigint, integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { genres } from "./genres";

export const media_genres = pgTable('media_genres', {
  genreId: integer().notNull().references(() => genres.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
})

export type MediaGenresTableType = typeof media_genres.$inferSelect

export const mediaGenresRelations = relations(media_genres, ({ one, many }) => ({
  genre: one(genres, {
    fields: [media_genres.genreId],
    references: [genres.id]
  }),
  media: one(medias, {
    fields: [media_genres.mediaId],
    references: [medias.id]
  })
}))