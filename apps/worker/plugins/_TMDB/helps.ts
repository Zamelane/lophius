import { PluginStorage } from "src/pluginsManager/pluginStorage"
import { StorageData } from "./types"
import { RateLimiter } from "src/utils/rateLimiter"

export async function getDataByStorage(storage: PluginStorage) {
  let { data, successful } = await storage.get<StorageData>()

  if (!successful || !data)
    throw new Error("Не удалось получить данные из хранилища")

  return data
}

export const rateLimiter = new RateLimiter(40, 60_000)