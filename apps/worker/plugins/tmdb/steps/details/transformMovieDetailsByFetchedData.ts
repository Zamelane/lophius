import { movieDetails } from '@plugins/tmdb/client'
import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, MovieFetchedDataContext } from '../types'

type Props = FetchedMovieDetailsContext

type InWith = Props & {
  token: string
}

type OutWith = InWith & MovieFetchedDataContext

export class TransformMovieDetailsByFetchedDataStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const fmd = ctx.fetchedMovieDetails
    const fetchedData: MovieFetchedDataContext['fetchedData'] = {
      ...fmd
    }

    return {
      ...ctx,
      fetchedData
    }
  }
}