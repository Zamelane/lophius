import { OnlineSearchMethodArgs } from "src/types"
import { pluginQueue } from "src"
import TMDB from ".."
import { searchMovie } from "../client"
import TMDBPlugin from ".."

export async function onlineSearch(this: TMDBPlugin, { status, request }: OnlineSearchMethodArgs) {
    const data = await this.storageData
    await this.storage.GetSourceId()

    if (!data || !data.token || !this.storage.sourceId) {
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