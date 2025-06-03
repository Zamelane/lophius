import type { MediasType, ObjectType } from '@/src/features/media/search/types'
import type { MediaType } from 'database/src/schemas/media_types'
import type { GlobalSearchItemCardProps } from '../../../web/src/widgets/global-search/items/gs-card-item'
import type { SearchStatus } from './search-status'

export type SearchData = {
  query: string
  mediaType: MediaType
  objectType: ObjectType
  locale: string
}

export type StatusUpdate = GlobalSearchItemCardProps

export type MediaOnlineResultType = {
  items: MediasType[]
  source: {
    id: number
    name: string
  }
}

export interface SearchRequest {
  userId: number
  data: SearchData
  status: SearchStatus
}
