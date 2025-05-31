import { execute } from '@plugins/tmdb/execute.ts'
import type { ParserPlugin } from '../../src/types.ts'
import { searchMovie } from './client/sdk.gen.ts'
import { StorageData } from './types.ts'
import { saveMovies } from './actions/savers.ts'
import { pluginQueue } from 'src/index.ts'
import { checkStorage } from './actions/checkStorage.ts'
import { getDataByStorage } from './utils.ts'

const TMDB: ParserPlugin = {
  name: 'TMDB',
  uid: 'GSIST',
  version: '0.1.1',
  execute,

  // Онлайн поиск
  concurrent: 10,       // 10 одновременных
  maxInMinute: 40 * 60, // 40 в секунду
  onlineSearch: async ({ status, request, storage }) => {
    await checkStorage(storage)
    const data = await getDataByStorage(storage)
    await storage.GetSourceId()

    if (!data || !data.token || !storage.sourceId) {
      return
    }

    const { data: fetchData, error, request: rq } = await pluginQueue.addAction(TMDB.uid, async () => {
      return searchMovie({
        auth: data.token!,
        query: {
          query: request.query,
          include_adult: true
        }
      })
    }
    )

    if (error || !fetchData) {
      console.log('Ошибка запроса')
      // TODO: отдавать клиенту инфу об ошибках
      return
    }



    await saveMovies(fetchData, storage.sourceId, data.token, storage, {
      uid: TMDB.uid,
      status
    })

    // *пример*
    // let i = 0
    // while (i++ < 1500) {
    //   const result = { number: i, left: 30 - i }
    //   await pluginQueue.addAction(TMDB.uid, async () => {
    //     status.addUpdate({

    //     })
    //   })
    // }
  }
}

export default TMDB
