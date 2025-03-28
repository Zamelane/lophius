import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {medias} from "../../schemas/medias";

export type Media = InferSelectModel<typeof medias>
export type OptionalMedia = WithOptional<Media, 'id' | 'sourceId'>
export type PartialMedia = Omit<Media, 'id' | 'sourceId'>
export type MediaId = Media['id']
export type OptionalMediaId = Partial<MediaId>