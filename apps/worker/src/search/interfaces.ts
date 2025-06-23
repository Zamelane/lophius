import type { MediasType, ObjectType } from '@/src/features/media/search/types'
import type { MediaType } from 'database/src/schemas/media_types'
import type { GlobalSearchItemCardProps } from '../../../web/src/widgets/global-search/items/gs-card-item'
import type { SearchStatus } from './search-status'
import { MediaInfoType } from '../../../web/src/shared/types/web-types';
import { ParseStatus } from './parse-status';

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

export type ParseUpdate = MediaInfoType

export interface ParseRequest {
  userId: number
  mediaId: number
  locale: string
  uid: string
  status: ParseStatus
}

export interface SearchRequest {
  userId: number
  data: SearchData
  status: SearchStatus
}

export type Request = ParseRequest | SearchRequest