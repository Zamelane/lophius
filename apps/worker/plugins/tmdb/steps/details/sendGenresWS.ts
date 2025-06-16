import { FetchedMovieDetailsContext, MovieFetchedDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = FetchedMovieDetailsContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendGenresWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieDetails, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedMovieDetails.genres) {
      status.newData.meta.genres = fetchedMovieDetails.genres.map(genre => {
        if (!genre.id || !genre.name)
          return null
        
        return {
          id: genre.id,
          name: {
            title: genre.name,
            lang: request.locale
          }
        }
      }).filter(v => v !== null)
    }

    status.addPatch()

    return ctx
  }
}