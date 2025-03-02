import {logger} from "../utils";
import type {PluginConfig} from "./types.ts";
import {PluginStorage} from "./pluginStorage.ts";

export const logicProcess = async (plugins: PluginConfig[]) => {
  logger.info('Plugin handler initialized ...');

  for (const plugin of plugins) {
    await plugin.main({
      storage: new PluginStorage(plugin.name)
    })
  }
}