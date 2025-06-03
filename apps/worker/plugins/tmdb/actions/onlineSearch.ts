import { pluginQueue } from 'src'
import type { OnlineSearchMethodArgs } from 'src/types'
import type TMDBPlugin from '..'
import { searchMovie, searchPerson, searchTv } from '../client'
import { InternalConfig } from '../config'
import type { StorageData } from '../types'
import { createPrefetchMediaPipeline } from '../utils/pipelineFactory'

export async function onlineSearch(
  this: TMDBPlugin,
  onlineSearch: OnlineSearchMethodArgs
) {
  const data = this.storageData

  if (!data || !data.token || !this.storage.sourceId) {
    return
  }

  if (onlineSearch.request.mediaType === 'video' && onlineSearch.request.objectType === 'media') {
    await fetchVideos(this, data, onlineSearch)
  }

  if (onlineSearch.request.objectType === 'person') {
    await fetchPersons(this, data, onlineSearch)
  }
}

async function fetchPersons(
  plugin: TMDBPlugin,
  data: StorageData,
  { status, request }: OnlineSearchMethodArgs
) {
  const {
    data: fetchData,
    error
  } = await pluginQueue.addAction(plugin.uid, async () => {
    return searchPerson({
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

  let i = 0
  for (const item of fetchData.results || []) {
    if (!item.id)
      continue

    // const result = await createPrefetchMediaPipeline(plugin, {
    //   external_id: item.id.toString(),
    //   isAdult: item.adult ?? true,
    //   isVideo: item.video ?? false,
    //   mediaType: 'video',
    //   mediaStatus: 'preliminary',
    //   contentType: 'film'
    // }).execute()

    if (item.id) {
      status.addUpdate(plugin, {
        id: ++i,
        isAdult: item.adult ?? true,
        objectType: 'person',
        mediaType: 'person',
        name: item.name || "Нету",
        avatar: item.profile_path
          ? {
              domain: InternalConfig.img.domain,
              https: InternalConfig.img.https,
              path: InternalConfig.img.path + item.profile_path
            }
          : undefined,
        gender: item.gender === 1
            ? false
            : item.gender === 2
              ? true
              : undefined
      })
    }
  }
}

async function fetchVideos(
  plugin: TMDBPlugin,
  data: StorageData,
  { status, request }: OnlineSearchMethodArgs
) {
  const {
    data: fetchData,
    error
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

  // Перебираем фильмы
  for (const item of fetchData.results || []) {
    if (!item.id)
      continue

    const result = await createPrefetchMediaPipeline(plugin, {
      external_id: item.id.toString(),
      isAdult: item.adult ?? true,
      isVideo: item.video ?? false,
      mediaType: 'video',
      mediaStatus: 'preliminary',
      contentType: 'film'
    }).execute()

    if (result.media.id) {
      status.addUpdate(plugin, {
        id: result.media.id,
        isAdult: item.adult ?? true,
        mediaType: 'video',
        objectType: 'media',
        contentType: 'film',
        title: item.title ?? 'Нету',
        poster: item.poster_path
          ? {
              domain: InternalConfig.img.domain,
              https: InternalConfig.img.https,
              path: InternalConfig.img.path + item.poster_path
            }
          : undefined,
        firstAirDate: item.release_date
      })
    }
  }

  // Запрашиваем сериалы
  const {
    data: fetchSerialsData,
    error: serialsError
  } = await pluginQueue.addAction(plugin.uid, async () => {
    return searchTv({
      auth: data.token!,
      query: {
        query: request.query,
        include_adult: true,
        language: request.locale
      }
    })
  })

  if (serialsError || !fetchSerialsData) {
    console.log('Ошибка запроса')
    // TODO: отдавать клиенту инфу об ошибках
    return
  }

  // Перебираем сериалы
  for (const item of fetchSerialsData.results || []) {
    if (!item.id)
      continue

    const result = await createPrefetchMediaPipeline(plugin, {
      external_id: item.id.toString(),
      isAdult: item.adult ?? true,
      isVideo: false,
      mediaType: 'video',
      mediaStatus: 'preliminary',
      contentType: 'serial'
    }).execute()

    if (result.media.id) {
      status.addUpdate(plugin, {
        id: result.media.id,
        isAdult: item.adult ?? true,
        mediaType: 'video',
        objectType: 'media',
        contentType: 'serial',
        title: item.name ?? 'Нету',
        poster: item.poster_path
          ? {
              domain: InternalConfig.img.domain,
              https: InternalConfig.img.https,
              path: InternalConfig.img.path + item.poster_path
            }
          : undefined,
        firstAirDate: item.first_air_date
      })
    }
  }

}
