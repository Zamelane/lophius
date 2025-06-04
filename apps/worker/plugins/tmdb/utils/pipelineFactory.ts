import type { Context } from '@plugins/tmdb/types'
import type { OptionalExternalImage, OptionalMedia } from 'database'
import { SourceMediaService } from 'database/src/services/SourceMediaService'
import { Pipeline } from 'src/lib/pipeline'
import type { TMDBPlugin } from '../plugin'
import {
  CommitStep,
  CreateOrGetVideoStep,
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
import { OptionalPeople } from 'database/models/People'
import { SetPeopleStep } from '../steps/peoples/setPeople'
import { PartialPeopleTranslateWithOutModels, PartialPeopleTranslateWithOutPeople } from 'database/models/PeopleTranslation'
import { SetPeopleAvatarStep } from '../steps/peoples/setPeopleAvatar'
import { SetPeopleTranslateStep } from '../steps/peoples/setPeopleTranslate'

export function createMoviePipeline(
  initialContext: Context
): Pipeline<Context> {
  return new Pipeline<Context>(initialContext)
    .addStep(new CreateOrGetVideoStep())
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

export type MediaPrefetchContext = {
  media: OptionalMedia
  sourceMediaService: SourceMediaService
}
export function createPrefetchMediaPipeline(
  plugin: TMDBPlugin,
  media: MediaPrefetchContext['media']
) {
  return new Pipeline<MediaPrefetchContext>({
    media,
    sourceMediaService: new SourceMediaService(plugin.storage.sourceId)
  })
    .addStep(new CreatePrefetchMediaStep())
    .addStep(new CommitStep())
}

export type PeoplePrefetchContext = {
  avatar?: OptionalExternalImage
  people: OptionalPeople
  translation: PartialPeopleTranslateWithOutModels
  sourceMediaService: SourceMediaService
}
export function createPrefetchPersonPipeline(
  plugin: TMDBPlugin,
  people: PeoplePrefetchContext['people'],
  translation: PeoplePrefetchContext['translation'],
  avatar: PeoplePrefetchContext['avatar']
) {
  return new Pipeline<PeoplePrefetchContext>({
    people,
    avatar,
    translation,
    sourceMediaService: new SourceMediaService(plugin.storage.sourceId)
  })
    .addStep(new SetPeopleStep())
    .addStep(new SetPeopleTranslateStep())
    .addStep(new SetPeopleAvatarStep())
    .addStep(new CommitStep())
}