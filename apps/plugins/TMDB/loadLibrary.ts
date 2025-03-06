import { Method } from "../../parser-server/src";
import { moviesLibraryLoader } from "./helpers/moviesLibraryLoader";
import { StorageData } from "./types";

export const loadLibrary: Method = async ({ storage }) => {
  let { data, successful } = await storage.get<StorageData>()

  if (!successful || !data)
    throw new Error("Не удалось получить данные из хранилища")

  await moviesLibraryLoader({
    data,
    storage
  })
}