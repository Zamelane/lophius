import { MovieCreditsDataContext, MovieFetchedDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = MovieFetchedDataContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendRatingWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    status.newData.meta.rating = {
      voteAverage: fetchedData.vote_average || 0,
      voteCount: fetchedData.vote_count || 0
    }

    status.addPatch()

    return ctx
  }
}