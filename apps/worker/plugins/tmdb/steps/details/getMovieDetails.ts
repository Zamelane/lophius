import { movieDetails } from '@plugins/tmdb/client'
import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, MovieFetchedDataContext } from '../types'

type Props = {
  fetchedData: MovieFetchedDataContext['fetchedData']
} | {
  externalId: string
}

type InWith = Props & {
  token: string
}

type OutWith = InWith & FetchedMovieDetailsContext

export class GetMovieDetailsStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    // Проверяем, что есть либо mediaModel, либо mediaId
    if (!('externalId' in ctx) && !('fetchedData' in ctx)) {
      console.log(ctx)
      throw new Error('Either externalId or fetchedData must be provided')
    }

    // Проверяем наличие fetchedData и его id
    // @ts-ignore
    if ('fetchedData' in ctx && !ctx.fetchedData?.id) {
      throw new Error('Movie ID is missing in fetchedData')
    }

    const { data, error } = await movieDetails({
      auth: ctx.token,
      path: {
        // @ts-ignore
        movie_id: ctx?.fetchedData?.id || ctx.externalId
      }
    })

    if (error) {
      throw new Error(`Failed to fetch movie details: ${error}`)
    }

    if (!data) {
      // @ts-ignore
      throw new Error(`No data received for movie ID: ${ctx?.fetchedData?.id || ctx.externalId}`)
    }

    return {
      ...ctx,
      fetchedMovieDetails: data
    }
  }
}