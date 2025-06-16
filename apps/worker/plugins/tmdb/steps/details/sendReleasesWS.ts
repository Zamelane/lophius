import { ImagesFetcherDataContext, MovieReleasesFetcherDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = MovieReleasesFetcherDataContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendReleasesWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieReleasesData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    const topDate = fetchedMovieReleasesData.results?.sort((a, b) => {
      const ar = a.release_dates?.sort((ara, arb) => {
        if (!ara.iso_639_1 && !arb.iso_639_1) return NaN;
        if (!ara.iso_639_1) return 1;
        if (!arb.iso_639_1) return -1;

        if (typeof ara.release_date === 'string' && typeof arb.release_date === 'string') {
          const a1 = new Date(ara.release_date)
          const b1 = new Date(arb.release_date)
          if (a1 > b1) return -1;
          if (a1 < b1) return 1;
          return 0;
        }

        return NaN;
      })?.[0]

      const br = b.release_dates?.sort((bra, brb) => {
        if (!bra.iso_639_1 && !brb.iso_639_1) return NaN;
        if (!bra.iso_639_1) return 1;
        if (!brb.iso_639_1) return -1;

        if (typeof bra.release_date === 'string' && typeof brb.release_date === 'string') {
          const a1 = new Date(bra.release_date)
          const b1 = new Date(brb.release_date)
          if (a1 > b1) return -1;
          if (a1 < b1) return 1;
          return 0;
        }

        return NaN;
      })?.[0]

      if (ar && br) {
        return new Date(ar.release_date!) > new Date(br.release_date!) ? -1 : 1;
      } else if (ar) {
        return -1;
      } else if (br) {
        return 1;
      }
    })?.[0].release_dates?.sort((a, b) => {
      const aData = a.release_date ? new Date(a.release_date) : new Date()
      const bDate = b.release_date ? new Date(b.release_date) : new Date()

      if (aData < bDate) {
        return -1;
      } else if (aData > bDate) {
        return 1;
      } else {
        return 0;
      }
    })?.[0].release_date

    if (topDate) {
      status.newData.meta.releaseDate = topDate
    }

    status.addPatch()

    return ctx
  }
}