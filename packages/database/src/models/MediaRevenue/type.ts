import {WithOptional} from "../../index";
import {MediaModel} from "database/models/Media/model.ts";
import {media_revenues} from "database/schemas/media_revenues.ts";

export type MediaRevenue = typeof media_revenues.$inferSelect
export type OptionalMediaRevenue = WithOptional<MediaRevenue, 'mediaId'>
export type PartialMediaRevenue = Omit<MediaRevenue, 'mediaId'> & {
	media: MediaModel
}