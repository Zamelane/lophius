import { LoadLibraryMethod } from "../../../src";
import { moviesLibraryLoader } from "./movies";

export const loadLibrary: LoadLibraryMethod = async ({ storage }) => {
  await moviesLibraryLoader(storage)

  return true
}