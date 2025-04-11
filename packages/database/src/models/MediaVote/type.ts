import {WithOptional} from "../../index";
import {MediaModel} from "database/models/Media/model.ts";
import {media_votes} from "database/schemas";

export type MediaVote = typeof media_votes.$inferSelect
export type OptionalMediaVote = WithOptional<MediaVote, 'mediaId'>
export type PartialMediaVote = Omit<MediaVote, 'mediaId'> & {
	media: MediaModel
}