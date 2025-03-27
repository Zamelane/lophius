import {WithOptional} from "@/database";
import {InferSelectModel} from "drizzle-orm";
import {sources} from "@/database/schemas/sources";

export type Source = InferSelectModel<typeof sources>
export type SourceId = Source['id']
export type PartialSource = Omit<Source, 'id'>
export type OptionalSource = WithOptional<Source, 'id'>