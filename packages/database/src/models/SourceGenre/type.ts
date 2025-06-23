import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { source_genres } from '../../schemas'

export type SourceGenre = InferSelectModel<typeof source_genres>
export type OptionalSourceGenre = WithOptional<
  SourceGenre,
  'genreId' | 'sourceId'
>
export type PartialSourceGenre = Omit<SourceGenre, 'genreId' | 'sourceId'>
