import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {sources} from "../../schemas/sources";

export type Source = InferSelectModel<typeof sources>
export type PartialSource = Omit<Source, 'id'>
export type OptionalSource = WithOptional<Source, 'id'>

export type OptionalSourceId = OptionalSource['id']
export type SourceId = Source['id']