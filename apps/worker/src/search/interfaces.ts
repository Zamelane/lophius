import { SearchStatus } from "./search-status";
import { MediasType } from '../../../web/actions/server/media/other/search/index';

export type SearchData = any;

export type StatusUpdate = any;

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