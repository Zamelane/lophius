import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {genre_translations} from "database/schemas/genre_translations.ts";

export type GenreTranslation = InferSelectModel<typeof genre_translations>
export type OptionalGenreTranslation = WithOptional<GenreTranslation, 'genreId' | 'languageId'>
export type PartialGenreTranslation = Omit<GenreTranslation, 'genreId' | 'languageId'>