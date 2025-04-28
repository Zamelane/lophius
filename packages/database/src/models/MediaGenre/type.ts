import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {media_genres} from "../../schemas";
import { GenreModel } from "../Genre/model";
import { MediaModel } from "../Media/model";

export type MediaGenre = InferSelectModel<typeof media_genres> & {
  genre: GenreModel
  media: MediaModel
}
export type OptionalMediaGenre = WithOptional<MediaGenre, 'genreId' | 'mediaId' | 'genre' | 'media'>
export type PartialMediaGenre = Omit<MediaGenre, 'genreId' | 'mediaId'>