import { LanguageISO } from "web-server/managers"
import { logger } from "../../../parser-server/src"
import { PluginStorage } from "../../../parser-server/src/pluginsManager/pluginStorage"
import { MovieDiscoverPage, StorageData } from "../types"
import { fetcher } from "./fetcher"
import { moviePageUrl } from "./urls"
import { movieAutoSaveDiscover } from "./movieAutoSave"

const maxAttempts = 3
const language: LanguageISO = {
  iso_639_1: 'en',
  iso_3166_1: 'US'
}
const sleepMS = 10000

export const moviesLibraryLoader = async (args: args) => {
  let { parsedPage } = args.data

  let attempts = 0
  let totalPages = 0
  while (attempts < maxAttempts) {
    // Получаем следующую страницу, если запрос не является повторной попыткой
    if (attempts == 0)
      parsedPage++

    const url = moviePageUrl(parsedPage, language)
    const { data, successful } = await fetcher<MovieDiscoverPage>(url)

    if (!successful || !data)
    {
      attempts++
      logger.debug(`Ошибка запроса (попытка №${attempts}/${maxAttempts})`)
      Bun.sleep(sleepMS) // отдыхаем
      continue
    }

    /* Обрабатываем данные */
    if (totalPages != 0 && data.page > totalPages) // Если выше за пределы доступных страниц
      return
    
    if (totalPages != data.total_pages)
      totalPages = data.total_pages

    // Сохраняем в базу
    let saveMovieAttempts = 0
    for (const movie of data.results) {
      // Пробуем сохранять, пока не закончатся попытки
      while (saveMovieAttempts < maxAttempts) {
        try {
          await movieAutoSaveDiscover(movie, language)
          saveMovieAttempts = 0
          break
        } catch {
          logger.error(`Ошибка сохранения фильма ${movie.title}`)
          saveMovieAttempts++
          Bun.sleep(sleepMS) // отдыхаем
        }
      }
      if (saveMovieAttempts >= maxAttempts){
        throw new Error(`Не удалось сохранить фильм ${movie.title}`)
      }
    }

    //console.log(data)

    // Сбрасываем счётчик неудачных попыток
    attempts = 0
  }
}

type args = {
  storage: PluginStorage
  data: StorageData
}