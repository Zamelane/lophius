import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {genres} from "../../schemas";

export type Genre = InferSelectModel<typeof genres>
export type OptionalGenre = WithOptional<Genre, 'id'>
export type PartialGenre = Omit<Genre, 'id'>

export type GenreId = Genre['id']
export type OptionalGenreId = OptionalGenre['id']