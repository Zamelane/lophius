import { SearchStatus } from "./search-status";
import { MediasType } from '../../../web/src/features/media/search/search/index';
import { MediaType } from "database/src/schemas/media_types";
import { GlobalSearchItemCardProps } from '../../../web/src/widgets/global-search/items/gs-card-item';

export type SearchData = {
  query: string
  mediaType: MediaType
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
  userId: number;
  data: SearchData;
  status: SearchStatus;
}