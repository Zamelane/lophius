import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_images, external_posters} from "../../schemas";

export type ExternalPoster = InferSelectModel<typeof external_posters>
export type OptionalExternalPoster = WithOptional<ExternalPoster, 'externalImageId' | 'mediaId'>
export type PartialExternalPoster = Omit<ExternalPoster, 'externalImageId' | 'mediaId'>