import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_logos, external_posters} from "../../schemas";
import {ExternalImageModel} from "database/models/ExternalImage/model";
import {MediaModel} from "database/models/Media/model.ts";

export type ExternalLogo = InferSelectModel<typeof external_logos> & {
	externalImage: ExternalImageModel
	media: MediaModel
}
export type OptionalExternalLogo = WithOptional<ExternalLogo, 'externalImageId' | 'mediaId'>
export type PartialExternalLogo = Omit<ExternalLogo, 'externalImageId' | 'mediaId'>