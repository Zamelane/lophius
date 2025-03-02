import {logger, PluginConfig} from "../../parser-server/src";

export const config: PluginConfig = {
  name: 'IMDb',
  version: '0.1.0',
  allowedMediaTypes: ['film', 'serial', 'anime'],
  main: async ({storage}) => {
    logger.info(`(IMDb) Load data from storage ...`)
    const data = storage.get<{}>()
    logger.info(`(IMDb) Successful load data from storage!`)
  }
}