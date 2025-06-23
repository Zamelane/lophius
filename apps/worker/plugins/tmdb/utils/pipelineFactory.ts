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
import { CreatePeopleAvatarStep } from '../steps/peoples/createPeopleAvatar'
import { SetPeopleTranslateStep } from '../steps/peoples/setPeopleTranslate'
import { ParseRequest, ParseUpdate } from 'src/search/interfaces'
import { ParseStatus } from 'src/search/parse-status'
import { SendTranslationsWSStep } from '../steps/translations/sendTranslationsWS'
import { CreateOptionalMediaByDetailsStep } from '../steps/details/optionalMediaByDetails'
import { TransformMovieDetailsByFetchedDataStep } from '../steps/details/transformMovieDetailsByFetchedData'
import { SendImagesWS } from '../steps/translations/sendImagesWS'
import { GetReleasesStep } from '../steps/details/getReleases'
import { SetReleasesStep } from '../steps/details/setReleases'
import { SendReleasesWS } from '../steps/details/sendReleasesWS'
import { GetCreditsStep } from '../steps/details/getCredits'
import { SendCreditsWS } from '../steps/details/sendCreditsWS'
import { SendRatingWS } from '../steps/details/sendRatingWS'
import { SendHomepageWS } from '../steps/details/sendHomepageWS'
import { SendGenresWS } from '../steps/details/sendGenresWS'
import { SendMediaRawWS } from '../steps/details/sendMediaRawWS'
import { SendProductionCountriesWS } from '../steps/details/sendProductionCountries'
import { SendSpokenLanguagesWS } from '../steps/details/sendSpokenLanguages'
import { SendRevenueWS } from '../steps/details/sendRevenueWS'
import { SendRuntimeWS } from '../steps/details/sendRuntimeWS'
import { GetRecomendationsStep } from '../steps/details/getRecomendations'
import { SendRecommendationsWS } from '../steps/details/sendRecommendationsWS'

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
    .addStep(new CreatePeopleAvatarStep())
    .addStep(new SetPeopleStep())
    .addStep(new SetPeopleTranslateStep())
    .addStep(new CommitStep())
}

export function createParseMediaInfoPipeline(
  plugin: TMDBPlugin,
  status: ParseStatus,
  request: ParseRequest,
  initialContext: {
    externalId: string
    sourceMediaService: SourceMediaService
    token: string
  }
) {
  return new Pipeline({
    ...initialContext,
    status,
    request,
    plugin,
    locale: request.locale
  })
    .addStep(new GetMovieDetailsStep())
    .addStep(new CreateOptionalMediaByDetailsStep())
    .addStep(new CreatePrefetchMediaStep())
    .addStep(new TransformMovieDetailsByFetchedDataStep())
    .addStep(new CreateOrGetVideoStep())

    .addStep(new SendRatingWS())
    .addStep(new SendHomepageWS())
    .addStep(new SendGenresWS())
    .addStep(new SendMediaRawWS())
    .addStep(new SendProductionCountriesWS())
    .addStep(new SendSpokenLanguagesWS())
    .addStep(new SendRevenueWS())
    .addStep(new SendRuntimeWS())

    .addStep(new GetTranslationsStep())
    .addStep(new SendTranslationsWSStep())

    .addStep(new GetImagesStep())
    .addStep(new SendImagesWS())

    .addStep(new GetReleasesStep())
    .addStep(new SendReleasesWS())

    .addStep(new GetCreditsStep())
    .addStep(new SendCreditsWS())

    .addStep(new GetRecomendationsStep())
    .addStep(new SendRecommendationsWS())

    .addStep(new SetReleasesStep())
    .addStep(new SetTranslationsStep())
    .addStep(new SetImagesStep())
    .addStep(new SetGenresStep())
    .addStep(new SetMediaBudgetStep())
    .addStep(new SetMediaRevenueStep())
    .addStep(new SetMediaStatusStep())
    
    .addStep(new CommitStep())
}