import { Dispatch } from "react"
import { SWRConfiguration } from "swr"
import { UsersTableType } from "@/db/tables"
import { FilesTableType } from "@/db/tables/files"

export const mediaPaths = ['/anime', '/book', '/comic', '/kino', '/music']

// Для типизации страниц
export type IdType = {
  id: string
}

export type ParamsType = {
  params: Promise<IdType>
}

export type FallbackType<T> = {
  fallback?: SWRConfiguration
  fallbackData: T
}

// Вспомогательные
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type SetState<T> =  Dispatch<T>

// Типизация сущностей
export type User = WithOptional<UsersTableType, 'email' | 'password'>
export type AvatarImage = FilesTableType
export type BackgroundImage = FilesTableType

// Объединения сущностей
export type UserInfo = User & {
  avatar?: AvatarImage | null
  background?: BackgroundImage | null
  isMe?: boolean
}