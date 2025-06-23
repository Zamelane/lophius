import type { genre_translations } from 'database/schemas/genre_translations.ts'
import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'

export type GenreTranslation = InferSelectModel<typeof genre_translations>
export type OptionalGenreTranslation = WithOptional<
  GenreTranslation,
  'genreId' | 'languageId'
>
export type PartialGenreTranslation = Omit<
  GenreTranslation,
  'genreId' | 'languageId'
>
