import type { ArrayElementType } from '@/interfaces'
import type { MediaModel } from 'database/src/models/Media/model.ts'
import type { SourceMediaService } from 'database/src/services/SourceMediaService.ts'
import type { PluginStorage } from '../../src/plugin-storage.ts'
import type {
  DiscoverMovieResponse,
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieTranslationsResponse
} from './client'

export interface Context {
  fetchedData: ArrayElementType<DiscoverMovieResponse['results']>
  fetchedMovieDetails?: MovieDetailsResponse
  fetchedTranslatesData?: MovieTranslationsResponse
  fetchedImagesData?: MovieImagesResponse
  storage: PluginStorage
  sourceMediaService: SourceMediaService
  mediaModel?: MediaModel
  token: string
}

export type StorageData = {
  movies: ParsedConfig
  serials: ParsedConfig
  token: string | null
  defaultLang: string
}

export type ParsedConfig = {
  isFullParsed: boolean
  firstUpdateDate: Date | null
  startLastUpdateDate: Date | null
  succesfullLastUpdateDate: Date | null
  page: number
  date_gte: string | null
  date: string | null
}
