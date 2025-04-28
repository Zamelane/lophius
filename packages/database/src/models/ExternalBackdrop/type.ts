import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_backdrops} from "../../schemas";
import {MediaModel} from "../Media/model";
import { ExternalImageModel } from "../ExternalImage/model";

export type ExternalBackdrop = InferSelectModel<typeof external_backdrops> & {
	externalImage: ExternalImageModel
	media: MediaModel
}
export type OptionalExternalBackdrop = WithOptional<ExternalBackdrop, 'externalImageId' | 'mediaId'>
export type PartialExternalBackdrop = Omit<ExternalBackdrop, 'externalImageId' | 'mediaId'>