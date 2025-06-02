import { execute } from '@plugins/tmdb/execute.ts'
import type { ParserPlugin } from '../../src/types.ts'
import { onlineSearch } from './actions/onlineSearch.ts'

const TMDB: ParserPlugin = {
  name: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  execute,

  // Онлайн поиск
  concurrent: 10,       // 10 одновременных
  maxInMinute: 40 * 60, // 40 в секунду
  onlineSearch
}

export default TMDB
