import type { PluginStorage } from './plugin-storage'
import type { ParseRequest, SearchRequest } from './search/interfaces'
import { ParseStatus } from './search/parse-status'
import type { SearchStatus } from './search/search-status'

export type Method<TThis> = (this: TThis) => Promise<void>

export type OnlineSearchMethod<TThis> = (
  this: TThis,
  args: OnlineSearchMethodArgs
) => Promise<void>

export type OnlineSearchMethodArgs = {
  status: SearchStatus
  request: SearchRequest['data']
}


export type ParseMethod<TThis> = (
  this: TThis,
  args: ParseMethodArgs
) => Promise<void>

export type ParseMethodArgs = {
  status: ParseStatus
  request: ParseRequest
}


export type ParserPluginConfig = {
  pluginName: string
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

  // Parse
  parseMediaInfo?: ParseMethod<TThis>
}

/**
 * Тип для самого класса плагина (с static init)
 */
export interface ParserPluginClass<
  T extends ParserPluginInstance = ParserPluginInstance
> {
  uid: string
  pluginName: string
  init(storage: PluginStorage): Promise<T>
}

// Вообще левые вспомогательные
// TODO: Надо вынести прям в общие потом для всей репы, наверное
export type RequireContextFields<T, K extends keyof T> = T & {
  [P in K]-?: NonNullable<T[P]>
}
