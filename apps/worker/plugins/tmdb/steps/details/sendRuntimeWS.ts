import { MediaModel } from 'database/models/Media/model';
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';
import { FetchedMovieDetailsContext } from '../types';

type InWith = FetchedMovieDetailsContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendRuntimeWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieDetails, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedMovieDetails.runtime) {
      status.newData.meta.runtime = fetchedMovieDetails.runtime
    }

    status.addPatch()

    return ctx
  }
}