import type { DiscoverMovieResponse } from '@plugins/tmdb/client'
import type { Context } from '@plugins/tmdb/types.ts'
import { SourceMediaService } from 'database/src/services/SourceMediaService.ts'
import type { TMDBPlugin } from '../plugin.ts'
import { createMoviePipeline } from '../utils/pipelineFactory.ts'

export async function saveMovies(
  plugin: TMDBPlugin,
  moviesData: DiscoverMovieResponse,
  sourceId: number
) {
  if (!moviesData.results)
    throw new Error('Could not save movies for movies data')

  console.info('⏳ Save movies ...')

  for (const movie of moviesData.results) {
    const ctx: Context = {
      token: plugin.storageData.token,
      sourceMediaService: new SourceMediaService(sourceId),
      fetchedData: movie
    }
    const pipeline = createMoviePipeline(ctx)
    await pipeline.execute()
  }
}
