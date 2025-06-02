import { moviesLibraryLoader } from '@plugins/tmdb/actions/api.ts'
import { checkStorage } from '@plugins/tmdb/actions/checkStorage.ts'
import { MethodArgs } from 'src/types'

export async function execute({ storage }: MethodArgs) {
  await checkStorage(storage)
  await moviesLibraryLoader(storage)
}
