import { OnlineSearchMethodArgs } from "src/types"
import { pluginQueue } from "src"
import { searchMovie } from "../client"
import TMDBPlugin from ".."
import { createPrefetchMediaPipeline } from "../utils/pipelineFactory"

export async function onlineSearch(this: TMDBPlugin, { status, request }: OnlineSearchMethodArgs) {
  const data = this.storageData
  await this.storage.GetSourceId()

  if (!data || !data.token || !this.storage.sourceId) {
    return
  }

  const { data: fetchData, error, request: rq } = await pluginQueue.addAction(this.uid, async () => {
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
    const result = await createPrefetchMediaPipeline(this, {
      external_id: item.id!.toString(),
      isAdult: item.adult ?? true,
      isVideo: item.video ?? false,
      mediaType: 'kino'
    }).execute()

    if (result.media.id)
      status.addUpdate(this, {
        id: result.media.id,
        isAdult: item.adult ?? true,
        mediaType: 'kino',
        objectType: 'media',
        title: item.title ?? "Нету"
      })
  }
}