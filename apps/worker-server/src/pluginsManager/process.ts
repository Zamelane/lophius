import {logger} from "../utils/index.ts";
import type {MethodArgs, Plugin} from "./types.ts";
import {PluginStorage} from "./pluginStorage.ts";

export const logicProcess = async (plugin: Plugin) => {
  logger.info(`Plugin (${plugin.name}) handler initialized ...`);

  const args: MethodArgs = {
    storage: new PluginStorage(plugin.name)
  }

  const pluginProcess = plugin.setup(args)
    .catch(() => logger.error(`Plugin (${plugin.name}) setup error`))

  pluginProcess.then(async () => {
    logger.info(`Plugin (${plugin.name}) setup success`)
    await plugin.loadLibrary(args).catch(
      (e) => logger.error(`Plugin (${plugin.name}) loadLibrary error: ${e}`)
    )
  })

  await pluginProcess
}