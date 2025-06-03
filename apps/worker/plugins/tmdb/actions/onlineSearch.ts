import { pluginQueue } from 'src'
import type { OnlineSearchMethodArgs } from 'src/types'
import type TMDBPlugin from '..'
import { searchMovie } from '../client'
import { InternalConfig } from '../config'
import type { StorageData } from '../types'
import { createPrefetchMediaPipeline } from '../utils/pipelineFactory'

export async function onlineSearch(
  this: TMDBPlugin,
  onlineSearch: OnlineSearchMethodArgs
) {
  // Валидируем запрос поиска
  if (onlineSearch.request.objectType !== 'media') {
    return
  }

  const data = this.storageData

  if (!data || !data.token || !this.storage.sourceId) {
    return
  }

  if (onlineSearch.request.mediaType === 'kino') {
    await fetchVideos(this, data, onlineSearch)
  }
}

async function fetchVideos(
  plugin: TMDBPlugin,
  data: StorageData,
  { status, request }: OnlineSearchMethodArgs
) {
  const {
    data: fetchData,
    error,
    request: rq
  } = await pluginQueue.addAction(plugin.uid, async () => {
    return searchMovie({
      auth: data.token!,
      query: {
        query: request.query,
        include_adult: true,
        language: request.locale
      }
    })
  })

  if (error || !fetchData) {
    console.log('Ошибка запроса')
    // TODO: отдавать клиенту инфу об ошибках
    return
  }

  for (const item of fetchData.results || []) {
    const result = await createPrefetchMediaPipeline(plugin, {
      external_id: item.id?.toString(),
      isAdult: item.adult ?? true,
      isVideo: item.video ?? false,
      mediaType: 'kino',
      mediaStatus: 'preliminary'
    }).execute()

    if (result.media.id) {
      status.addUpdate(plugin, {
        id: result.media.id,
        isAdult: item.adult ?? true,
        mediaType: 'kino',
        objectType: 'media',
        title: item.title ?? 'Нету',
        poster: item.poster_path
          ? {
              domain: InternalConfig.img.domain,
              https: InternalConfig.img.https,
              path: InternalConfig.img.path + item.poster_path
            }
          : undefined
      })
    }
  }
}
