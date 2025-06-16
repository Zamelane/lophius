import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';
import { FetchedMovieDetailsContext } from '../types';

type InWith = FetchedMovieDetailsContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendSpokenLanguagesWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedMovieDetails, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedMovieDetails.spoken_languages) {
      status.newData.meta.spokenLanguages = fetchedMovieDetails.spoken_languages.map(c => {
        if (!c.iso_639_1 || (!c.english_name && !c.name)) {
          return null
        }

        return {
          id: 1,
          iso_639_1: c.iso_639_1,
          name: {
            title: c.name || c.english_name!,
            lang: request.locale
          }
        }
      }).filter(v => v !== null)
    }

    status.addPatch()

    return ctx
  }
}