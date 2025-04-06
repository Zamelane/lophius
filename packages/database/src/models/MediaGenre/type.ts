import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {media_genres} from "../../schemas";

export type MediaGenre = InferSelectModel<typeof media_genres>
export type OptionalMediaGenre = WithOptional<MediaGenre, 'genreId' | 'mediaId'>
export type PartialMediaGenre = Omit<MediaGenre, 'genreId' | 'mediaId'>