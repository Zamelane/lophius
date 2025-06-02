import { Pipeline } from 'src/lib/pipeline'
import { Context } from '@plugins/tmdb/types'

import { CreateOrGetKinoStep } from '@plugins/tmdb/steps/createOrGetKino'
import { GetTranslationsStep } from '@plugins/tmdb/steps/getTranslations'
import { GetImagesStep } from '../steps/getImages'
import { GetMovieDetailsStep } from '../steps/getMovieDetails'
import { SetTranslationsStep } from '../steps/setTranslations'
import { SetImagesStep } from '../steps/setImages'
import { SetGenresStep } from '../steps/setGenres'
import { SetMediaBudgetStep } from '../steps/setMediaBudget'
import { SetMediaRevenueStep } from '../steps/setMediaRevenue'
import { SetMediaStatusStep } from '../steps/setMediaStatus'
import { CommitStep } from '../steps/commit'

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
