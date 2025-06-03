import { SearchStatus } from "./search-status";
import { MediaType } from "database/src/schemas/media_types";
import { GlobalSearchItemCardProps } from '../../../web/src/widgets/global-search/items/gs-card-item';
import { MediasType, ObjectType } from "@/src/features/media/search/types";

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
  userId: number;
  data: SearchData;
  status: SearchStatus;
}