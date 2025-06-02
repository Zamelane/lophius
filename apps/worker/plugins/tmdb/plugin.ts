// /plugins/tmdb/plugin.ts

import { TMDBConfig } from './config'
import { execute as executeLoader } from './actions/execute'
import { onlineSearch as searchAction } from './actions/onlineSearch'
import { ParserPlugin } from 'src/types'

export class TMDBPlugin implements ParserPlugin {
  name = TMDBConfig.name
  uid = TMDBConfig.uid
  version = TMDBConfig.version

  maxInMinute = TMDBConfig.maxInMinute
  concurrent = TMDBConfig.concurrent

  execute: ParserPlugin['execute'] = async (args) => {
    return executeLoader(args)
  }

  onlineSearch: ParserPlugin['onlineSearch'] = async (args) => {
    return searchAction(args)
  }
}