import {logger} from "../utils";
import type {MethodArgs, Plugin} from "./types.ts";
import {PluginStorage} from "./pluginStorage.ts";

export const logicProcess = async (plugins: Plugin[]) => {
  logger.info('Plugin handler initialized ...');

  const processes = []

  for (const plugin of plugins) {
    const args: MethodArgs = {
      storage: new PluginStorage(plugin.name)
    }

    const pluginProcess = plugin.setup(args)
      .then(() => {
        logger.info(`Plugin (${plugin.name}) setup success`)
        plugin.loadLibrary(args).catch((e) => logger.error(`Plugin (${plugin.name}) loadLibrary error: ${e}`))
      })
      .catch(() => logger.error(`Plugin (${plugin.name}) setup error`))

      processes.push(pluginProcess)
  }

  return Promise.all(processes)
   .then(() => logger.info('Plugin handler finished!'))
}