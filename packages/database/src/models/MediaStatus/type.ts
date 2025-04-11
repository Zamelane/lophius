import {WithOptional} from "../../index";
import {MediaModel} from "database/models/Media/model.ts";
import {media_statuses} from "database/schemas";

export type MediaStatus = typeof media_statuses.$inferSelect
export type OptionalMediaStatus = WithOptional<MediaStatus, 'mediaId'>
export type PartialMediaStatus = Omit<MediaStatus, 'mediaId'> & {
	media: MediaModel
}