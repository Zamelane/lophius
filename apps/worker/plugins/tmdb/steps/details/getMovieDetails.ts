import { movieDetails } from '@plugins/tmdb/client'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, MovieFetchedDataContext } from '../types'

type InWith = MovieFetchedDataContext & {
  token: string
  mediaModel: MediaModel
}

type OutWith = InWith & FetchedMovieDetailsContext

export class GetMovieDetailsStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
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

    return {
      ...ctx,
      fetchedMovieDetails: data
    }
  }
}
