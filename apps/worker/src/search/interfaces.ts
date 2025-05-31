import { SearchStatus } from "./search-status";
import { MediasType } from '../../../web/src/features/media/search/search/index';
import { MediaType } from "database/src/schemas/media_types";
import { CardItemProp } from '../../../web/src/features/calendar/ui/media-cards/card';

export type SearchData = {
  query: string
  mediaType: MediaType
}

export type StatusUpdate = CardItemProp

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