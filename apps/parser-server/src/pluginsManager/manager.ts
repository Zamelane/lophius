import {logger} from '../utils';
import {readdir} from 'node:fs/promises'
import type {Plugin} from "./types.ts";
import {logicProcess} from "./process.ts";

class PluginsManager {

  // Плагины (источники)
  private pluginsPath: string = "../plugins";
  private plugins: Plugin[] = []
  constructor() {
    logger.info("Initializing Manager ...");
  }

  // Статусы обработок
  private process?: Promise<void>

  /**
   * Загружает плагины (источники) в систему
   */
  public async reloadPlugins(): Promise<void> {
    const paths = await readdir(this.pluginsPath)

    for (let path of paths) {
      path = `@plugins/${path}`
      try {
        const { config: plugin }: { config: Plugin } = await import(path + '/index.ts')
        this.plugins.push(plugin)
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
    this.process = logicProcess(this.plugins)

    this.process
      .catch(e => {
        logger.error(`Plugin handler error: ${e}`)
      })
      .finally(() => {
        this.process = undefined
        this.recheckProcess()
      })
  }

  private async recheckProcess() {
    logger.info('Recheck process (sleep 1m) ...')
    await Bun.sleep(60000)
    this.startMaintenance()
  }
}

export const pluginManager = new PluginsManager();