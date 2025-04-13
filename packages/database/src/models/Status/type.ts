import {WithOptional} from "../../index";
import {statuses} from "../../schemas";

export type Status = typeof statuses.$inferSelect
export type OptionalStatus = WithOptional<Status, 'id'>
export type PartialStatus = Omit<Status, 'id'>