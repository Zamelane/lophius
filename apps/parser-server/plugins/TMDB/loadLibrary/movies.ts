import { PluginStorage } from "@/src/pluginsManager/pluginStorage";
import { getDataByStorage } from "../helps";
import { discoverMovie, DiscoverMovieResponse } from "../client";
import { StorageData } from "../types";
import { saveMovies } from "../save/movie";

const maxAttempts = 3

export async function moviesLibraryLoader(storage: PluginStorage) {
  const storageData = await getDataByStorage(storage)
  const { movies, token, defaultLang } = storageData

  // Если уже всё извлекали, то просто выходим
  if (movies.isFullParsed)
    return

  // Сохраняем дату самого первого начала извлечения (это чтобы потом от этой даты искать обновления)
  if (!movies.firstUpdateDate) {
    await storage.update({ ...storageData, movies: { ...storageData.movies, firstUpdateDate: new Date() }})
  }

  // Задаём последнее начало извлечения данных
  await storage.update({ ...storageData, movies: { ...storageData.movies, startLastUpdateDate: new Date() }})

  // Получаем стартовые данные
  let { data: initData } = await discoverMovie({ auth: token!, query: { page: 0 } })

  if (!initData || !initData?.total_pages) {
    throw new Error(`Не удалось получить стартовые данные фильмов: сервер не вернул результаты или не удалось подключиться`)
  }
  
  let totalPages = initData.total_pages
  let page = movies.page

  // Если уже все страницы пройдены, то помечаем как успешно пройденное
  if (page >= totalPages) {
    await setTotalComplete({ storage, storageData })
    return
  }

  while (page <= totalPages) {
    page++
    let attempts = 0

    while (attempts <= maxAttempts) {
      const { data, error } = await discoverMovie({ auth: token!, query: { page } })

      if (
        error
        || !data
        || !data.page 
        || !data.total_pages
      ) {
        attempts++
        continue
      }
      
      attempts = 0

      // Тут сохраняем data
      saveMovies(data, defaultLang)
      await storage.update({ ...storageData, movies: { ...storageData.movies, page } })
      page = data.page
      totalPages = data.total_pages
      break
    }

    if (attempts > maxAttempts) {
      throw new Error(`После ${attempts} попыток так и не удалось извлечь данные о странице с фильмами`)
    }
  }

  // Ставим, что успешно всё спарсили
  await setTotalComplete({ storage, storageData })

  const { data, } = await discoverMovie({ auth: token! })
}

async function setTotalComplete({
  storage,
  storageData
}: { storage: PluginStorage, storageData: StorageData}) {
  storageData.movies.isFullParsed = true
  storageData.movies.succesfullLastUpdateDate ??= new Date()
  await storage.update(storageData)
}