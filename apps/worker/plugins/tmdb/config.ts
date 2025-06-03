import type { ParserPluginConfig } from 'src/types'

export const TMDBConfig: ParserPluginConfig = {
  pluginName: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  concurrent: 10,
  maxInMinute: 40 * 60
}

export const InternalConfig = {
  img: {
    https: true,
    domain: 'image.tmdb.org',
    path: '/t/p/original'
  }
}
