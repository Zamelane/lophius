import { OnlineSearchMethodArgs } from "src/types"
import { checkStorage } from "./checkStorage"
import { getDataByStorage } from "../utils"
import { pluginQueue } from "src"
import TMDB from ".."
import { searchMovie } from "../client"

export async function onlineSearch({ status, request, storage }: OnlineSearchMethodArgs) {
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
          include_adult: true,
          language: request.locale
        }
      })
    }
    )

    if (error || !fetchData) {
      console.log('Ошибка запроса')
      // TODO: отдавать клиенту инфу об ошибках
      return
    }

    let i = 0
    for (const item of fetchData.results || []) {
      status.addUpdate(TMDB, {
        id: ++i,
        isAdult: item.adult ?? true,
        mediaType: 'kino',
        objectType: 'media',
        title: item.title ?? "Нету"
      })
    }

    // await saveMovies(fetchData, storage.sourceId, data.token, storage, {
    //   uid: TMDB.uid,
    //   status
    // })

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