'use server'

import type { MediasTableType } from 'database/schemas'
import { SearchMediaOffline } from './searchMediaOffline'

export type Props = {
  search: string
  place: PlaceType
  objectType: ObjectType
  mediaType?: MediaType
  offset?: number
}

export type PlaceType = 'local' | 'ethernet'
export type ObjectType = 'media' | 'personage' | 'person' | 'user'
export type MediaType = 'all' | MediasTableType['mediaType']

export type VideoType = {
  id: number
  title: string
  mediaType: MediasTableType['mediaType']
  poster: {
    path: string
    domain: string
    https: boolean
  } | null
  isAdult: boolean
  objectType: 'media'
}

export type PersonType = {
  id: number
  name: string | string[]
  avatar?: {
    path: string
    domain: string
    https: string
  }
  age?: number
  objectType: 'person'
}

export type PersonageType = {
  id: number
  name: string | string[]
  avatar?: {
    path: string
    domain: string
    https: string
  }
  objectType: 'personage'
}

export type UserType = {
  id: number
  nickname: string
  avatar?: {
    id: number
    width: number
    height: number
  }
  objectType: 'user'
}

export type MediasType = VideoType | PersonType | PersonageType | UserType

export type MediaOfflineResultType = {
  items: MediasType[]
  total: number
  current: number
}

export type SearchResultType = MediaOfflineResultType

export async function Search({
  search,
  place,
  mediaType = 'all',
  objectType,
  offset
}: Props): Promise<SearchResultType | null> {
  if (objectType === 'media') {
    // Локальный поиск
    if (place === 'local') {
      return await SearchMediaOffline({
        search,
        mediaType,
        offset
      })
    }
  }

  return null
}
