import type { Context } from '@plugins/tmdb/types.ts'

export async function setGenres(ctx: Context): Promise<Context> {
  if (!ctx.mediaModel) throw new Error('Media model missing')

  if (!ctx.fetchedMovieDetails) throw new Error('Fetched MovieDetails missing')

  if (ctx.fetchedMovieDetails.genres) {
    const genres = []
    for (const genre of ctx.fetchedMovieDetails.genres) {
      if (!genre.name) continue
      const savedGenre = ctx.sourceMediaService.createIfNotExistGenre({
        english_name: genre.name
      })
      ctx.sourceMediaService.linkGenreByMedia(ctx.mediaModel, savedGenre)
      genres.push(savedGenre)
    }
    ctx.sourceMediaService.deleteGenresIfNotInArray(ctx.mediaModel, genres)
  }

  return ctx
}
