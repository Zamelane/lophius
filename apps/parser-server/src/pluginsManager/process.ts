import {logger} from "../utils";
import type {Plugin} from "./types.ts";
import {PluginStorage} from "./pluginStorage.ts";

export const logicProcess = async (plugins: Plugin[]) => {
  logger.info('Plugin handler initialized ...');

  for (const plugin of plugins) {
    await plugin.loadLibrary({
      storage: new PluginStorage(plugin.name)
    })
  }
}