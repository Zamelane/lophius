import {Context} from "@plugins/tmdb/types.ts";

export async function setMediaStatus(ctx: Context): Promise<Context> {
    if (!ctx.mediaModel)
        throw new Error('Media model missing');

    if (!ctx.fetchedMovieDetails)
        throw new Error('Fetched MovieDetails missing');

    if (ctx.fetchedMovieDetails.status) {
      ctx.sourceMediaService.setMediaStatus(ctx.mediaModel, ctx.fetchedMovieDetails.status)
    } else {
      ctx.sourceMediaService.setMediaStatus(ctx.mediaModel, null)
    }

    return ctx
}