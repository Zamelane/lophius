import { PluginStorage } from "src/pluginsManager/pluginStorage";
import { getDataByStorage } from "../helps";
import { discoverMovie } from "../client";
import { StorageData } from "../types";
import { saveMovies } from "../save/movie";
import { logger } from "src";
import { compareAsc } from "date-fns";
import { allFieldsDefined } from "@/interfaces";

export async function moviesLibraryLoader(storage: PluginStorage) {
  let storageData = await getDataByStorage(storage)
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

  let date: string|null     = movies.date      // Искомая дата
  let date_gte: string|null = movies.date_gte  // Ближайшая дата
  let page = movies.page                       // Страница от ближайшей даты
  let isSkip = false                           // Был ли скип итерации ?

  while (
    date === null && !isSkip
    || date != date_gte
    || date && date_gte && compareAsc(date, date_gte) == -1
    || date && date_gte && compareAsc(date, date_gte) == 0 && !isSkip
  ) {
    isSkip = false    // Сбрасываем скип, если продолжаем парсинг
    if (page >= 500) {
      page = 0
      date = date_gte
    }
    page++

    const { data, error } = await discoverMovie({ auth: token!, query: {
      page,
      sort_by: 'primary_release_date.asc',
      include_adult: true,
      include_video: true,
      "primary_release_date.gte": date ?? undefined
    }})

    if (error)
      throw new Error(`Ошибка извлечения страницы: ${JSON.stringify(error)}`)

    if (!data || !allFieldsDefined(data) || !allFieldsDefined(data.results))
      throw new Error(`Страница с фильмами вернула не все поля`)

    // Выкидываем себя из итерации, если нет результатов (будет либо переход к новой дате, либо завершение парса)
    if (data.results.length === 0){
      isSkip = true
      date = date_gte
      continue
    }

    // Сохраняем последнюю наибольшую известную нам дату
    const lastItemIndex = data.results.length - 1
    const lastItemReleaseDate = data.results[lastItemIndex].release_date as string | undefined
    date_gte = lastItemReleaseDate ?? null

    // Сохраняем результаты страниц
    await saveMovies(data, await storage.GetSourceId(), defaultLang)
    const rs = await storage.update<StorageData>({ ...storageData, movies: {
      ...storageData.movies,
      date_gte,
      date,
      page
    } })

    if (rs.successful == true && rs.data)
      storageData = rs.data

    logger.info(`Страница ${page}/${500} (${date}/${date_gte}) извлечена`)
  }

  setTotalComplete({ storage, storageData })
}

async function setTotalComplete({
  storage,
  storageData
}: { storage: PluginStorage, storageData: StorageData}) {
  storageData.movies.isFullParsed = true
  storageData.movies.succesfullLastUpdateDate ??= new Date()
  await storage.update(storageData)
}