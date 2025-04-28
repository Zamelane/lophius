import {WithOptional} from "../../index";
import { media_production_companies } from "database/schemas";
import {GenreModel} from "database/models/Genre/model.ts";
import {MediaModel} from "database/models/Media/model.ts";

export type MediaProductionCompany = typeof media_production_companies.$inferSelect
export type OptionalMediaProductionCompany = WithOptional<MediaProductionCompany, 'mediaId' | 'companyId'>
export type PartialMediaProductionCompany = Omit<MediaProductionCompany, 'genreId' | 'mediaId'> & {
	genre: GenreModel
	media: MediaModel
}