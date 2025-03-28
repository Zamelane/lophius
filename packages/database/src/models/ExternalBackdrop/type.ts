import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_backdrops} from "../../schemas";
import {MediaModel} from "../Media/model";
import {LanguageModel} from "../Language/model";

export type ExternalBackdrop = InferSelectModel<typeof external_backdrops>
export type OptionalExternalBackdrop = WithOptional<ExternalBackdrop, 'externalImageId' | 'mediaId'>
export type PartialExternalBackdrop = Omit<ExternalBackdrop, 'externalImageId' | 'mediaId'> & {
	externalImage: LanguageModel // TODO: ExternalImage модель сюда вставить!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	media: MediaModel
}