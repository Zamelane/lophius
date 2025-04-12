import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_posters} from "../../schemas";
import {ExternalImageModel} from "database/models/ExternalImages/model.ts";
import {MediaModel} from "database/models/Media/model.ts";

export type ExternalPoster = InferSelectModel<typeof external_posters> & {
	externalImage: ExternalImageModel
	media: MediaModel
}
export type OptionalExternalPoster = WithOptional<ExternalPoster, 'externalImageId' | 'mediaId'>
export type PartialExternalPoster = Omit<ExternalPoster, 'externalImageId' | 'mediaId'>