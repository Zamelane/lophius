import { SWRConfiguration } from "swr"

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