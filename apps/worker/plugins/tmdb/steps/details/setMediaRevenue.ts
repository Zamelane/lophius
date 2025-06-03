import type { Context } from '@plugins/tmdb/types.ts'

export class SetMediaRevenueStep {
  async execute(ctx: Context): Promise<Context> {
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
