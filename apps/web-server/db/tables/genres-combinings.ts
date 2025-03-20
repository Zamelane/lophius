import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";

import { genres } from "./genres";

export const genresCombinings = pgTable('genres_combinings', {
  genreId: integer().notNull().references(() => genres.id),
  analogGenreId: integer().notNull().references(() => genres.id)
})

export type GenresCombiningsTableType = InferSelectModel<typeof genresCombinings>