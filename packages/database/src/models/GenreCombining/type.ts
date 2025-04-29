import type { genres_combining } from 'database/schemas'
import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'

export type GenreCombining = InferSelectModel<typeof genres_combining>
export type OptionalGenreCombining = WithOptional<
  GenreCombining,
  'genreId' | 'analogGenreId'
>
export type PartialGenreCombining = Omit<
  GenreCombining,
  'genreId' | 'analogGenreId'
>
