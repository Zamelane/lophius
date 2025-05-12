'use server'

import {
  type MediasTableType,
} from 'database/schemas'
import { SearchMedia } from './searchMedia'

export type Props = {
  search: string
  place: PlaceType
  objectType: ObjectType
  mediaType?: MediaType
}

export type PlaceType = 'local' | 'ethernet'
export type ObjectType = 'media' | 'personage' | 'person' | 'user'
export type MediaType = 'all' | MediasTableType['mediaType']

type MediaResultType = {
  medias: {
    id: number
    title: string
    mediaType: MediasTableType['mediaType']
    poster: {
      path: string
      domain: string
      https: boolean
    } | null
  }[]
  total: number
  current: number
}

export type SearchResultType = MediaResultType

export async function Search({
  search,
  place,
  mediaType = 'all',
  objectType
}: Props) {
  if (objectType === 'media') {
    return await SearchMedia({
      search,
      place,
      mediaType
    })
  }
}