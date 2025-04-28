import {WithOptional} from "../../index";
import {InferSelectModel} from "drizzle-orm";
import {external_images, files} from "../../schemas";

export type File = InferSelectModel<typeof files>
export type OptionalFile = WithOptional<File, 'id'>
export type PartialFile = Omit<File, 'id'>

export type FileId = OptionalFile['id']
export type OptionalFileId = OptionalFile['id']