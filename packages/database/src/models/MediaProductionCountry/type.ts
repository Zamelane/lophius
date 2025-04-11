import {WithOptional} from "../../index";
import {media_production_countries} from "database/schemas";
import {MediaModel} from "database/models/Media/model.ts";
import {CountryModel} from "database/models/Country/model.ts";

export type MediaProductionCountry = typeof media_production_countries.$inferSelect
export type OptionalMediaProductionCountry = WithOptional<MediaProductionCountry, 'mediaId' | 'countryId'>
export type PartialMediaProductionCountry = Omit<MediaProductionCountry, 'mediaId' | 'countryId'> & {
	country: CountryModel
	media: MediaModel
}