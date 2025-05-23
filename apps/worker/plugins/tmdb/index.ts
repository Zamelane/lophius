import { execute } from '@plugins/tmdb/execute.ts'
import type { ParserPlugin } from '../../src/types.ts'
import { pluginQueue } from 'src/index.ts'

const TMDB: ParserPlugin = {
  name: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  execute,

  // Онлайн поиск
  concurrent: 10,
  maxInMinute: 40,
  onlineSearch: async ({ status }) => {
    let i = 0
    while (i++ < 1500) {
      const result = { number: i, left: 30 - i }
      pluginQueue.addAction(TMDB.uid, async () => {
        status.addUpdate(result)
      })
    }
  }
}

export default TMDB
