import type { PluginStorage } from 'src/plugin-storage'
import type { ParseMethod, ParserPluginInstance } from 'src/types'
import { checkStorage } from './actions/checkStorage'
import { execute as executeLoader } from './actions/execute'
import { onlineSearch as searchAction } from './actions/onlineSearch'
import { parseMediaInfo as parseMediaInfoAction } from './actions/parseMediaInfo'
import { TMDBConfig } from './config'
import type { StorageData } from './types'

export class TMDBPlugin implements ParserPluginInstance {
  pluginName = TMDBConfig.pluginName
  uid = TMDBConfig.uid
  version = TMDBConfig.version

  maxInMinute = TMDBConfig.maxInMinute
  concurrent = TMDBConfig.concurrent
  storageData!: StorageData

  private constructor(public storage: PluginStorage) {}

  // Делаем uid доступным до инициализации
  static uid = TMDBConfig.uid
  static pluginName = TMDBConfig.pluginName

  // Инициализация плагина
  static async init(storage: PluginStorage): Promise<TMDBPlugin> {
    const plugin = new TMDBPlugin(storage)
    plugin.storageData = await checkStorage(storage)
    return plugin
  }

  execute = executeLoader

  onlineSearch = searchAction

  parseMediaInfo = parseMediaInfoAction
}
