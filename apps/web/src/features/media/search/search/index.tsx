'use server'

import { SearchMediaOffline } from './searchMediaOffline'
import { MediaType, ObjectType, PlaceType, SearchResultType } from '../types'

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
