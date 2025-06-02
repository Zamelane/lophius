import { PluginStorage } from "./plugin-storage"
import { SearchRequest } from "./search/interfaces"
import { SearchStatus } from "./search/search-status"

export type Method = (args: MethodArgs) => Promise<void>
export type MethodArgs = {
  storage: PluginStorage
}

export type OnlineSearchMethod = (args: OnlineSearchMethodArgs) => Promise<void>
export type OnlineSearchMethodArgs = {
  storage: PluginStorage
  status: SearchStatus
  request: SearchRequest['data']
}

export type ParserPluginConfig = {
  name: string
  uid: string
  allowedDomains?: string[]
  version: string
  
  // Online search
  maxInMinute?: number
  concurrent?: number
}

export type ParserPlugin = ParserPluginConfig & {
  execute: Method

  // Online search
  onlineSearch?: OnlineSearchMethod
}