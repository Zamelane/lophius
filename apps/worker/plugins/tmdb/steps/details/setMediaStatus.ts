import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'

type InWith = FetchedMovieDetailsContext
& SourceMediaServiceContext
& {
  mediaModel: MediaModel
}

type OutWith = InWith

export class SetMediaStatusStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.mediaModel) throw new Error('Media model missing')

    if (!ctx.fetchedMovieDetails)
      throw new Error('Fetched MovieDetails missing')

    if (ctx.fetchedMovieDetails.status) {
      ctx.sourceMediaService.setMediaStatus(
        ctx.mediaModel,
        ctx.fetchedMovieDetails.status
      )
    } else {
      ctx.sourceMediaService.setMediaStatus(ctx.mediaModel, null)
    }

    return ctx
  }
}