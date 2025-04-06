import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {genres_combining} from "database/schemas";

export type GenreCombining = InferSelectModel<typeof genres_combining>
export type OptionalGenreCombining = WithOptional<GenreCombining, 'genreId' | 'analogGenreId'>
export type PartialGenreCombining = Omit<GenreCombining, 'genreId' | 'analogGenreId'>