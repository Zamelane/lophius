import Bun from 'bun'
import { glob } from 'glob'
import { PluginStorage } from './plugin-storage.ts'
import type { ParserPluginClass, ParserPluginInstance } from './types.ts'

export class PluginsManager {
  private pluginsPath = './plugins/*/index.{ts,js}'
  private plugins: Record<
    string,
    {
      plugin: ParserPluginInstance
      promise?: Promise<void>
    }
  > = {}

  constructor() {
    console.info('⚙️ Initializing Manager ...')
  }

  async loadPlugins() {
    console.info('📂 Reading plugins from the /plugins/ folder...')
    const pluginEntries = await glob(this.pluginsPath)
    this.plugins = {}

    if (pluginEntries.length) console.info('📋 Checking plugin structure...')

    let i = 0
    for (const entry of pluginEntries) {
      i++
      try {
        if (entry.includes('_')) {
          console.info(
            `⚠️ Ignoring  '${entry}': the symbol '_' is not allowed (see naming rules)`
          )
          continue
        }
        // Динамический импорт (Bun поддерживает ES-модули)
        const pluginModule = await import(entry)
        const plugin = pluginModule.default as ParserPluginClass
        const instance = await plugin.init(await PluginStorage.init(plugin.uid))

        if (!instance.name) {
          console.error(`🛑 Plugin '${entry}' ignored: missing 'name' field!`)
          continue
        }

        this.plugins[instance.name] = {
          plugin: instance
        }
        console.info(`✅ Plugin loaded: ${instance.name}`)
      } catch (err) {
        console.error(`❌ Plugin loading error (${entry}):`, err)
      }
    }

    console.info('✨ Plugins loading completed')
  }

  async startMaintenance() {
    while (true) {
      for (const pluginKey of Object.keys(this.plugins)) {
        const config = this.plugins[pluginKey]

        if (config.promise) continue

        config.promise = config.plugin
          .execute()
          .then(() => {
            config.promise = undefined
          })
      }
      await Bun.sleep(60000)
    }
  }

  getPlugins() {
    return Object.keys(this.plugins).map(key => this.plugins[key])
  }
}
