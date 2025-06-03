import type { Context } from '@plugins/tmdb/types.ts'

export class SetMediaBudgetStep {
  async execute(ctx: Context): Promise<Context> {
    if (!ctx.mediaModel) throw new Error('Media model missing')

    if (!ctx.fetchedMovieDetails)
      throw new Error('Fetched MovieDetails missing')

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
