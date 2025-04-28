import {WithOptional} from "../../index";
import {MediaModel} from "database/models/Media/model.ts";
import {media_votes, release_dates} from "database/schemas";
import {CountryModel} from "database/models/Country/model.ts";

export type ReleaseDate = typeof release_dates.$inferSelect
export type OptionalReleaseDate = WithOptional<ReleaseDate, 'mediaId' | 'countryId'>
export type PartialReleaseDate = Omit<ReleaseDate, 'mediaId' | 'countryId'> & {
	media: MediaModel
	country: CountryModel
}