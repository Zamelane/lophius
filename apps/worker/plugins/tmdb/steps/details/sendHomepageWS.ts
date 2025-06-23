import { FetchedMovieDetailsContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = FetchedMovieDetailsContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendHomepageWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieDetails, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedMovieDetails.homepage) {
      status.newData.meta.homepage = {
        default: {
          href: fetchedMovieDetails.homepage,
          lang: request.locale
        },
        total: 1
      }
    }

    status.addPatch()

    return ctx
  }
}

function calculateImgRating(
  locale: string,
  iso_639_1?: string,
  vote_average?: number,
  vote_count?: number) {
  let count = 0
  if (iso_639_1) {
    count = iso_639_1 === locale ? 100 : 10
  }

  if (vote_average) {
    count += 10;
  }

  if (vote_count) {
    count += 10;
  }
}