import { Method } from "../../../parser-server/src";
import { StorageData } from '../types'
import { autoParseCountries } from "./autoParseCountries";
import { autoParseLanguages } from "./autoParseLanguages";

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
      parsedPage: 0,
      isParsed: false,
      lastUpdateDate: new Date()
    }

    await storage.create(data)
      .then(r => {
        if (!r.successful)
          throw new Error("Не удалось сохранить настроечные данные в хранилище")
      })
  }

  // Скачиваем начальные данные (конфиги)
  await autoParseLanguages()  // Языки
  await autoParseCountries()
}