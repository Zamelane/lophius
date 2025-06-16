import { movieReleaseDates } from '@plugins/tmdb/client'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { MovieFetchedDataContext, MovieReleasesFetcherDataContext } from '../types'

type InWith = MovieFetchedDataContext
& {
  token: string
  mediaModel: MediaModel
}

type OutWith = MovieReleasesFetcherDataContext & InWith

export class GetReleasesStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.mediaModel) throw new Error('Media model missing')

    if (!ctx.fetchedData.id) throw new Error('Id is missing')

    const { data, error } = await movieReleaseDates({
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
      fetchedMovieReleasesData: data
    }
  }
}