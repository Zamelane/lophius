import { ArrayElementType } from "@/src/shared/types"
import { DiscoverMovieResponse, MovieCreditsResponse, MovieDetailsResponse, MovieImagesResponse, MovieReleaseDatesResponse, MovieTranslationsResponse } from "../client"
import { SourceMediaService } from "database/services/SourceMediaService"

export type MovieFetchedDataContext = {
  fetchedData: ArrayElementType<DiscoverMovieResponse['results']>
}

export type MovieCreditsDataContext = {
  fetchedCreditsData: MovieCreditsResponse
}

export type ImagesFetcherDataContext = {
  fetchedImagesData: MovieImagesResponse
}

export type MovieReleasesFetcherDataContext = {
  fetchedMovieReleasesData: MovieReleaseDatesResponse
}

export type TranslatesFetchedDataContext = {
  fetchedTranslatesData: MovieTranslationsResponse
}

export type SourceMediaServiceContext = {
  sourceMediaService: SourceMediaService
}

export type FetchedMovieDetailsContext = {
  fetchedMovieDetails: MovieDetailsResponse
}

export type OrMovieData = {
      fetchedMovieDetails: FetchedMovieDetailsContext['fetchedMovieDetails']
      fetchedData?: MovieFetchedDataContext['fetchedData']
    } | {
      fetchedMovieDetails?: FetchedMovieDetailsContext['fetchedMovieDetails']
      fetchedData: MovieFetchedDataContext['fetchedData']
    }