import { MovieCreditsDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = MovieCreditsDataContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendCreditsWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedCreditsData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    status.newData.meta.actors = fetchedCreditsData.cast?.map((p) => {
      return {
        id: p.id!,
        adult: p.adult || true,
        character: p.character,
        name: p.name ? {
          title: p.name,
          lang: request.locale
        } : undefined,
        order: p.order,
        profilePath: p.profile_path ? {
          domain: 'image.tmdb.org',
          https: true,
          path: '/t/p/original' + p.profile_path
        } : undefined
      }
    })

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