import type { Context } from '@plugins/tmdb/types.ts'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'

type InWith = FetchedMovieDetailsContext
  & SourceMediaServiceContext
  & {
    mediaModel: MediaModel
  }

type OutWith = InWith

export class SetReleasesStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    return ctx
  }
}