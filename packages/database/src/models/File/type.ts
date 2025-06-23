import type { InferSelectModel } from 'drizzle-orm'
import type { WithOptional } from '../../index'
import type { files } from '../../schemas'

export type File = InferSelectModel<typeof files>
export type OptionalFile = WithOptional<File, 'id'>
export type PartialFile = Omit<File, 'id'>

export type FileId = OptionalFile['id']
export type OptionalFileId = OptionalFile['id']
