import {WithOptional} from "@/database";
import {InferSelectModel} from "drizzle-orm";
import {medias} from "@/database/schemas/medias";

export type Media = InferSelectModel<typeof medias>
export type OptionalMedia = WithOptional<Media, 'id' | 'sourceId'>
export type PartialMedia = Omit<Media, 'id' | 'sourceId'>
export type MediaId = Media['id']
export type OptionalMediaId = Partial<MediaId>