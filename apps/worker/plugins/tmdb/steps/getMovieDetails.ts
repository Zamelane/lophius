import { movieDetails } from '@plugins/tmdb/client'
import type { Context } from '@plugins/tmdb/types.ts'

export async function getMovieDetails(ctx: Context): Promise<Context> {
  if (!ctx.mediaModel) throw new Error('Media model missing')

  if (!ctx.fetchedData.id) throw new Error('Id is missing')

  const { data, error } = await movieDetails({
    auth: ctx.token,
    path: {
      movie_id: ctx.fetchedData.id
    }
  })

  if (error || !data)
    throw new Error(
      JSON.stringify({
        error,
        id: ctx.fetchedData.id
      })
    )

  ctx.fetchedMovieDetails = data

  return ctx
}
