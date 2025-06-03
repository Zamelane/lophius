import type { MediasTableType } from 'database/schemas'
import { ContentTypesType } from 'database/schemas/media_types'

export const objectTypes = ['media', 'personage', 'person', 'user'] as const

export type PlaceType = 'local' | 'ethernet'
export type ObjectType = (typeof objectTypes)[number]
export type MediaType = 'all' | MediasTableType['mediaType']

export type VideoType = {
  id: number
  title: string
  mediaType: MediasTableType['mediaType']
  poster?: {
    path: string
    domain: string
    https: boolean
  } | null
  isAdult: boolean
  objectType: 'media'
  contentType: ContentTypesType
  firstAirDate?: string
}

export type PersonType = {
  id: number
  name: string | string[]
  avatar?: {
    path: string
    domain: string
    https: boolean
  }
  age?: number
  isAdult: boolean
  objectType: 'person'
  gender?: boolean
}

export type PersonageType = {
  id: number
  name: string | string[]
  avatar?: {
    path: string
    domain: string
    https: boolean
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
