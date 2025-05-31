import type { DiscoverMovieResponse } from '@plugins/tmdb/client'
import { commitStep } from '@plugins/tmdb/steps/commit.ts'
import { createOrGetKino } from '@plugins/tmdb/steps/createOrGetKino.ts'
import { getImages } from '@plugins/tmdb/steps/getImages.ts'
import { getTranslations } from '@plugins/tmdb/steps/getTranslations.ts'
import { setImages } from '@plugins/tmdb/steps/setImages.ts'
import { setTranslations } from '@plugins/tmdb/steps/setTranslations.ts'
import type { Context } from '@plugins/tmdb/types.ts'
import { SourceMediaService } from 'database/src/services/SourceMediaService.ts'
import { Pipeline } from '../../../src/lib/pipeline.ts'
import type { PluginStorage } from '../../../src/plugin-storage.ts'
import { getMovieDetails } from '../steps/getMovieDetails.ts'
import { setGenres } from '../steps/setGenres.ts'
import { setMediaBudget } from '../steps/setMediaBudget.ts'
import { setMediaRevenue } from '../steps/setMediaRevenue.ts'
import { setMediaStatus } from '../steps/setMediaStatus.ts'
import { SearchStatus } from 'src/search/search-status.ts'
import { sendOnlineResult } from '../steps/sendOnlineResult.ts'

export async function saveMovies(
  moviesData: DiscoverMovieResponse,
  sourceId: number,
  token: string,
  storage: PluginStorage,
  realtimeResult?: {
    uid: string,
    status: SearchStatus
  }
) {
  if (!moviesData.results)
    throw new Error('Could not save movies for movies data')

  console.info('⏳ Save movies ...')

  for (const movie of moviesData.results) {
    const pipeline = new Pipeline<Context>({
      storage,
      sourceMediaService: new SourceMediaService(sourceId),
      fetchedData: movie,
      token,
      realtimeResult
    })
      .addStep(createOrGetKino)
      .addStep(getTranslations)
      .addStep(getImages)
      .addStep(getMovieDetails)
      .addStep(setTranslations)
      .addStep(setImages)
      .addStep(setGenres)
      .addStep(setMediaBudget)
      .addStep(setMediaRevenue)
      .addStep(setMediaStatus)
      .addStep(commitStep)
      .addStep(sendOnlineResult)

    await pipeline.execute()
  }
}
