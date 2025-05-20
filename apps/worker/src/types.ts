import type { PluginStorage } from './plugin-storage.ts'
import { SearchRequest } from './search/interfaces.ts'
import { SearchStatus } from './search/search-status.ts'

export type ParserPlugin = {
  name: string
  uid: string
  allowedDomains?: string[]
  version: string

  // Системные вызовы
  execute: Method
} & OnlineSearchConfig

export type Method = (args: MethodArgs) => Promise<void>
export type MethodArgs = {
  storage: PluginStorage
}

export type OnlineSearchMethod = (args: OnlineSearchMethodArgs) => Promise<void>
export type OnlineSearchMethodArgs = {
  storage: PluginStorage,
  status: SearchStatus,
  request: SearchRequest['data']
}

export type OnlineSearchConfig = {
  onlineSearch?: undefined
  maxInMinute?: undefined
  concurrent?: undefined
} | {
  onlineSearch: OnlineSearchMethod
  maxInMinute: number
  concurrent: number
}