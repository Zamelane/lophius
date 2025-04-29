import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { media_genres } from '../../schemas'
import type { GenreModel } from '../Genre/model'
import type { MediaModel } from '../Media/model'

export type MediaGenre = InferSelectModel<typeof media_genres> & {
  genre: GenreModel
  media: MediaModel
}
export type OptionalMediaGenre = WithOptional<
  MediaGenre,
  'genreId' | 'mediaId' | 'genre' | 'media'
>
export type PartialMediaGenre = Omit<MediaGenre, 'genreId' | 'mediaId'>
