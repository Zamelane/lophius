import type { DiscoverMovieResponse } from '@plugins/tmdb/client'
import type { Context } from '@plugins/tmdb/types.ts'
import { SourceMediaService } from 'database/src/services/SourceMediaService.ts'
import type { PluginStorage } from '../../../src/plugin-storage.ts'
import { createMoviePipeline } from '../utils/pipelineFactory.ts'

export async function saveMovies(
  moviesData: DiscoverMovieResponse,
  sourceId: number,
  token: string,
  storage: PluginStorage
) {
  if (!moviesData.results)
    throw new Error('Could not save movies for movies data')

  console.info('⏳ Save movies ...')

  for (const movie of moviesData.results) {
    const ctx: Context = {
      storage,
      sourceMediaService: new SourceMediaService(sourceId),
      fetchedData: movie,
      token
    }
    const pipeline = createMoviePipeline(ctx)
    await pipeline.execute()
  }
}
