import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {genres, source_genres} from "../../schemas";

export type SourceGenre = InferSelectModel<typeof source_genres>
export type OptionalSourceGenre = WithOptional<SourceGenre, 'genreId' | 'sourceId'>
export type PartialSourceGenre = Omit<SourceGenre, 'genreId' | 'sourceId'>