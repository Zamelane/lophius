'use server'

import type {
  MediaType,
  ObjectType,
  PlaceType,
  SearchResultType
} from '../types'
import { SearchMediaOffline } from './searchMediaOffline'

export type Props = {
  search: string
  place: PlaceType
  objectType: ObjectType
  mediaType?: MediaType
  offset?: number
}

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
