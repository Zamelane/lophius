import { LoadLibraryMethod } from "../../../src";
import { getDataByStorage } from "../helps";
import { checkExistOrCreateLangByISO } from "../save/lang";
import { moviesLibraryLoader } from "./movies";

export const loadLibrary: LoadLibraryMethod = async ({ storage }) => {
  const { defaultLang, token } = await getDataByStorage(storage)

  if (!token)
    throw new Error(`Токен не установлен`)

  await checkExistOrCreateLangByISO(defaultLang, token)

  await moviesLibraryLoader(storage)

  return true
}