import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';
import { FetchedMovieDetailsContext } from '../types';

type InWith = FetchedMovieDetailsContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendProductionCountriesWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieDetails, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedMovieDetails.production_countries) {
      status.newData.meta.productionCountries = fetchedMovieDetails.production_countries.map(c => {
        if (!c.name || !c.iso_3166_1) {
          return null
        }

        return {
          id: 1,
          iso_3166_1: c.iso_3166_1,
          name: {
            title: c.name,
            lang: request.locale
          }
        }
      }).filter(v => v !== null)
    }

    status.addPatch()

    return ctx
  }
}