import { TMDBConfig } from './config'
import { execute as executeLoader } from './actions/execute'
import { onlineSearch as searchAction } from './actions/onlineSearch'
import { ParserPluginInstance } from 'src/types'
import { PluginStorage } from 'src/plugin-storage'
import { StorageData } from './types'
import { checkStorage } from './actions/checkStorage'

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
}