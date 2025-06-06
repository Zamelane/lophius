import { MediaInfoType } from "@/src/shared/types/web-types";

export type MessageContents = {
  elementType: 'posters',
  data: MediaInfoType['posters']
}

export type InitMessage = {
  type: 'init'
  data: MessageContents[]
}

export type UpdateMessage = {
  type: 'update'
  data: MessageContents
}

export type CloseMessage = { type: 'close' }

export type Message = InitMessage | UpdateMessage | CloseMessage