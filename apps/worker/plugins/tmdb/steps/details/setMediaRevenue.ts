import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'
import { MediaModel } from 'database/models/Media/model'

type InWith = FetchedMovieDetailsContext
& SourceMediaServiceContext
& {
  mediaModel: MediaModel
}

type OutWith = InWith

export class SetMediaRevenueStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.mediaModel) throw new Error('Media model missing')

    if (!ctx.fetchedMovieDetails)
      throw new Error('Fetched MovieDetails missing')

    if (ctx.fetchedMovieDetails.revenue) {
      ctx.sourceMediaService.setMediaRevenue(
        ctx.mediaModel,
        ctx.fetchedMovieDetails.revenue
      )
    } else {
      ctx.sourceMediaService.setMediaRevenue(ctx.mediaModel, null)
    }

    return ctx
  }
}