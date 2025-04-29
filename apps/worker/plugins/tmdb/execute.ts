import { moviesLibraryLoader } from '@plugins/tmdb/actions/api.ts'
import { checkStorage } from '@plugins/tmdb/actions/checkStorage.ts'
import type { MethodArgs } from '../../src/types.ts'

export async function execute({ storage }: MethodArgs) {
  await checkStorage(storage)
  await moviesLibraryLoader(storage)
}
