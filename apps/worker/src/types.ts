import { PluginStorage } from "./plugin-storage"
import { SearchRequest } from "./search/interfaces"
import { SearchStatus } from "./search/search-status"

export type Method<TThis> = (this: TThis) => Promise<void>

export type OnlineSearchMethod<TThis> = (this: TThis, args: OnlineSearchMethodArgs) => Promise<void>
export type OnlineSearchMethodArgs = {
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

export type ParserPluginInstance<TThis = any> = ParserPluginConfig & {
  execute: Method<TThis>


  // Online search
  onlineSearch?: OnlineSearchMethod<TThis>
}

/**
 * Тип для самого класса плагина (с static init)
 */
export interface ParserPluginClass<T extends ParserPluginInstance = ParserPluginInstance> {
  uid: string
  init(storage: PluginStorage): Promise<T>
}