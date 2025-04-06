import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {media_budgets} from "../../schemas";

export type MediaBudget = InferSelectModel<typeof media_budgets>
export type OptionalMediaBudget = WithOptional<MediaBudget, 'mediaId'>
export type PartialMediaBudget = Omit<MediaBudget, 'mediaId'>