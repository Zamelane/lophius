import { Method } from "../../../src";
import { ClientOptions } from "../client";
import { client } from "../client/client.gen";
import { StorageData } from '../types'

const clientOptions: ClientOptions = {
  baseUrl: 'https://api.themoviedb.org'
}

export const setup: Method = async ({
  storage
}) => {
  const storageGetResult = await storage.get<StorageData>()
  let { data } = storageGetResult

  // Если была ошибка в получении данных
  if (!storageGetResult.successful)
  {
    throw new Error("Не удалось получить данные из хранилища")
  }

  // Если данных в хранилище нет, то заносим базовые
  if (!storageGetResult?.data) {
    data = storageGetResult.data = {
      movies: {
        isFullParsed: false,
        page: 0,
        firstUpdateDate: null,
        startLastUpdateDate: null,
        succesfullLastUpdateDate: null,
      },
      serials: {
        isFullParsed: false,
        page: 0,
        firstUpdateDate: null,
        startLastUpdateDate: null,
        succesfullLastUpdateDate: null
      },
      token: process.env.TMDB_TOKEN ?? null,
      defaultLang: 'en'
    }

    await storage.create(data)
      .then(r => {
        if (!r.successful)
          throw new Error("Не удалось сохранить настроечные данные в хранилище")
      })
  }

  // Настраиваем клиент
  client.setConfig(clientOptions)
}