import type {PluginStorage} from "./pluginStorage.ts";

export type Plugin = {
  name: string
  iconPath?: string
  version: string
  allowedMediaTypes: AllowedMediaTypes[]

  setup: Method            // Настройка и прочее (например, загрузка первоначальных данных, проверка целости конфига)
  loadLibrary: Method      // Загружает всю библиотеку в нашу базу данных (только основную информацию, такие как id)
  loadMediaDetails: Method // Загружает подробную информацию об 1 медиа (+ обновление в базе)
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