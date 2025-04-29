import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { genres } from '../../schemas'

export type Genre = InferSelectModel<typeof genres>
export type OptionalGenre = WithOptional<Genre, 'id'>
export type PartialGenre = Omit<Genre, 'id'>

export type GenreId = Genre['id']
export type OptionalGenreId = OptionalGenre['id']
