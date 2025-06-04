import type { Context } from '@plugins/tmdb/types.ts'
import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'

type InWith = FetchedMovieDetailsContext
& SourceMediaServiceContext
& {
  mediaModel: MediaModel
}

type OutWith = InWith

export class SetMediaBudgetStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (ctx.fetchedMovieDetails.budget) {
      ctx.sourceMediaService.setMediaBudget(
        ctx.mediaModel,
        ctx.fetchedMovieDetails.budget
      )
    } else {
      ctx.sourceMediaService.setMediaBudget(ctx.mediaModel, null)
    }

    return ctx
  }
}