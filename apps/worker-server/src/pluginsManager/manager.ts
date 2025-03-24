import {logger} from '../utils/index.ts';
import {readdir} from 'node:fs/promises'
import type {Plugin} from "./types.ts";
import {logicProcess} from "./process.ts";
import Bun from 'bun'

class PluginsManager {

  // Плагины (источники)
  private pluginsPath: string = "./plugins";
  private plugins: {
    plugin: Plugin
    promise: Promise<void>|undefined
  }[] = []
  private maintenanceIsRun = false

  constructor() {
    logger.info("Initializing Manager ...");
  }

  /**
   * Загружает плагины (источники) в систему
   */
  public async reloadPlugins(): Promise<void> {
    const paths = await readdir(this.pluginsPath)

    for (let path of paths) {
      if (!(await Bun.file(`${this.pluginsPath}/${path}`).stat())?.isDirectory())
        continue
      path = `@plugins/${path}`
      try {
        const { config: plugin }: { config: Plugin } = await import(path + '/index.ts')
        this.plugins.push({
          plugin,
          promise: undefined
        })
        logger.info(`Successfully load plugin '${plugin.name} (${plugin.version})'!`)
      } catch (err) {
        logger.error(`Failed to load plugin (${path}), more detailed: ${err} ...`)
      }
    }

    logger.info(`Successfully load plugins!`)
  }

  /**
   * Запускает процесс вызова плагинов
   */
  public async startMaintenance() {
    logger.info("Starting Maintenance (plugin handler) ...")
    this.maintenanceIsRun = true

    while (this.maintenanceIsRun) {
      for (const plugin of this.plugins) {
        if (plugin.promise === undefined)
          plugin.promise = logicProcess(plugin.plugin).then(() => plugin.promise = undefined)
      }
      logger.info('Recheck process (sleep 1m) ...')
      await Bun.sleep(60000)
    }

    this.maintenanceIsRun = false
  }
}

export const pluginManager = new PluginsManager();