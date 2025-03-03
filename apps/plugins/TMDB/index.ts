import {logger, Plugin} from "../../parser-server/src";
import request from "../../web-server/i18n/request";

export const config: Plugin = {
  name: 'TMDB',
  version: '0.1.0',
  allowedMediaTypes: ['film', 'serial', 'anime'],
  loadLibrary: async ({storage}) => {
    // logger.info(`(IMDb) Load data from storage ...`)
    // const data = storage.get<{}>()
    // logger.info(`(IMDb) Successful load data from storage!`)
    //request()
  },
  setup: async () => {},
  loadMediaDetails: async () => {}
}