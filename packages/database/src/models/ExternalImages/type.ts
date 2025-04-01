import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_images} from "../../schemas";

export type ExternalImage = InferSelectModel<typeof external_images>
export type OptionalExternalImage = WithOptional<ExternalImage, 'id' | 'languageId' | 'sourceId' | 'externalDomainId'>
export type PartialExternalImage = Omit<ExternalImage, 'id' | 'languageId' | 'sourceId' | 'externalDomainId'>

export type ExternalImageId = ExternalImage['id']
export type OptionalExternalImageId = OptionalExternalImage['id']