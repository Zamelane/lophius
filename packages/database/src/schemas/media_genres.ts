import { InferSelectModel } from "drizzle-orm";
import { bigint, integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { genres } from "./genres";

export const mediaGenres = pgTable('media_genres', {
  genreId: integer().notNull().references(() => genres.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
})

export type MediaGenresTableType = InferSelectModel<typeof mediaGenres>

// TODO: ТУТ СВЯЗИ ДОДЕЛАТЬ И ДАЛЬШЕ