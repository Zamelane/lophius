import { movieCredits, movieRecommendations } from '@plugins/tmdb/client'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { MovieFetchedDataContext, MovieRecommendationsDataContext } from '../types'

type InWith = MovieFetchedDataContext & {
  token: string
  mediaModel: MediaModel
  locale?: string
}

type OutWith = MovieRecommendationsDataContext & InWith

export class GetRecomendationsStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.mediaModel) throw new Error('Media model missing')

    if (!ctx.fetchedData.id) throw new Error('Id is missing')

    const { data, error } = await movieRecommendations({
      auth: ctx.token,
      path: {
        movie_id: ctx.fetchedData.id
      },
      query: {
        language: ctx.locale
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
      fetchedRecommendationsData: data
    }
  }
}