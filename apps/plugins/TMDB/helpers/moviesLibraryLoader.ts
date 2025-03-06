import { logger } from "../../../parser-server/src"
import { PluginStorage } from "../../../parser-server/src/pluginsManager/pluginStorage"
import { MovieDiscoverPage, StorageData } from "../types"
import { fetcher } from "./fetcher"
import { moviePageUrl } from "./urls"

const maxAttempts = 3

export const moviesLibraryLoader = async (args: args) => {
  let { parsedPage } = args.data

  let attempts = 0
  let totalPages = 0
  while (attempts < maxAttempts) {
    // Получаем следующую страницу, если запрос не является повторной попыткой
    if (attempts == 0)
      parsedPage++

    const url = moviePageUrl(parsedPage)
    const { data, successful } = await fetcher<MovieDiscoverPage>(url)

    if (!successful || !data)
    {
      attempts++
      logger.debug(`Ошибка запроса (попытка №${attempts}/${maxAttempts})`)
      continue
    }

    /* Обрабатываем данные */
    if (totalPages != 0 && data.page > totalPages) // Если выше за пределы доступных страниц
      return
    
    if (totalPages != data.total_pages)
      totalPages = data.total_pages

    console.log(data)

    // Сбрасываем счётчик неудачных попыток
    attempts = 0
  }
}

type args = {
  storage: PluginStorage
  data: StorageData
}