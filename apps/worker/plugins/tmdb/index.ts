import { execute } from '@plugins/tmdb/execute.ts'
import type { ParserPlugin } from '../../src/types.ts'

const TMDB: ParserPlugin = {
  name: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  execute
}

export default TMDB
