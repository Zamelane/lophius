import type {PluginStorage} from "./pluginStorage.ts";

export type PluginConfig = {
  name: string
  iconPath?: string
  version: string
  allowedMediaTypes: AllowedMediaTypes[]

  main: Method
}

export type AllowedMediaTypes = 'film'
  | 'serial'
  | 'anime'
  | 'comic'
  | 'book'
  | 'novel'
  | 'music'

type Method = (args: MethodArgs) => Promise<void>
type MethodArgs = {
  storage: PluginStorage
}