import { moviesLibraryLoader } from '@plugins/tmdb/actions/api.ts'
import type { TMDBPlugin } from '../plugin'

export async function execute(this: TMDBPlugin) {
  await moviesLibraryLoader(this)
}
