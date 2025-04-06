import {InferSelectModel, relations} from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";

import { genres } from "./genres";

export const genres_combining = pgTable('genres_combinings', {
  genreId: integer().notNull().references(() => genres.id),
  analogGenreId: integer().notNull().references(() => genres.id)
})

export type GenresCombiningTableType = typeof genres_combining.$inferSelect

export const genresCombiningRelations = relations(genres_combining, ({ one, many }) => ({
  genre: one(genres, {
    fields: [genres_combining.genreId],
    references: [genres.id]
  }),
  analogGenre: one(genres, {
    fields: [genres_combining.analogGenreId],
    references: [genres.id]
  })
}))