import { Pipeline } from 'src/lib/pipeline'
import { Context } from '@plugins/tmdb/types'
import {
  CommitStep,
  CreateOrGetKinoStep,
  CreatePrefetchMediaStep,
  GetImagesStep,
  GetMovieDetailsStep,
  GetTranslationsStep,
  SetGenresStep,
  SetImagesStep,
  SetMediaBudgetStep,
  SetMediaRevenueStep,
  SetMediaStatusStep,
  SetTranslationsStep
} from '../steps'
import { WithOptional } from 'database'
import { Media } from 'database/src/schemas'
import { SourceMediaService } from 'database/src/services/SourceMediaService'
import { TMDBPlugin } from '../plugin'

export function createMoviePipeline(initialContext: Context): Pipeline<Context> {
  return new Pipeline<Context>(initialContext)
    .addStep(new CreateOrGetKinoStep())
    .addStep(new GetTranslationsStep())
    .addStep(new GetImagesStep())
    .addStep(new GetMovieDetailsStep())
    .addStep(new SetTranslationsStep())
    .addStep(new SetImagesStep())
    .addStep(new SetGenresStep())
    .addStep(new SetMediaBudgetStep())
    .addStep(new SetMediaRevenueStep())
    .addStep(new SetMediaStatusStep())
    .addStep(new CommitStep())
}


export type PrefetchContext = {
  media: WithOptional<Media, 'id' | 'sourceId'>,
  sourceMediaService: SourceMediaService
}
export function createPrefetchMediaPipeline(plugin: TMDBPlugin, media: PrefetchContext['media']): Pipeline<PrefetchContext> {
  return new Pipeline<PrefetchContext>({ media, sourceMediaService: new SourceMediaService(plugin.storage.sourceId) })
    .addStep(new CreatePrefetchMediaStep())
    .addStep(new CommitStep())
}