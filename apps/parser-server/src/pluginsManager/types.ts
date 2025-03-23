import type {PluginStorage} from "./pluginStorage.ts";

export type Plugin = {
  name: string
  iconPath?: string
  version: string
  allowedMediaTypes: AllowedMediaTypes[]

  // Системные вызовы
  setup: Method                       // Настройка и прочее (например, загрузка первоначальных данных, проверка целости конфига)
  loadLibrary: LoadLibraryMethod      // Загружает всю библиотеку в нашу базу данных (только основную информацию, такие как id)
  loadMediaDetails: Method            // Загружает подробную информацию об 1 медиа (+ обновление в базе)
  // Проверка обновлений
  checkUpdates: CheckUpdatesMethod    // Должен вернуть id из источника или из нашей базы для тех медиа, которые нужно обновить или добавить
  // Получение свежей информации (для существующих или создание)
  update: UpdateMethod                // Должен вернуть СТАТУС УСПЕХА ОБНОВЛЕНИЯ, но ТОЛЬКО ПОСЛЕ УСПЕШНОГО ВЫПОЛНЕНИЯ (все async должны быть await, т.к. свежие данные будут извлекаться из базы)
}

export type AllowedMediaTypes = 'kino'
  | 'anime'
  | 'comic'
  | 'book'
  | 'novel'
  | 'music'

export type Method = (args: MethodArgs) => Promise<void>
export type MethodArgs = {
  storage: PluginStorage
}

export type LoadLibraryMethod = (args: MethodArgs) => Promise<boolean>

export type CheckUpdatesMethod = (args: MethodArgs) => Promise<boolean>

export type UpdateMethod = (args: UpdateMethodArgs) => Promise<boolean>
export type UpdateMethodArgs = MethodArgs & {
  internalId: number
  externalId: string
}