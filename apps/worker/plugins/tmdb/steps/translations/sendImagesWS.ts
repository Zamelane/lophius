import { ImagesFetcherDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = ImagesFetcherDataContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendImagesWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedImagesData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    const topBackdrop = fetchedImagesData.backdrops?.sort((a, b) => {
      let aRating = calculateImgRating(
        request.locale,
        typeof a.iso_639_1 === 'string' ? a.iso_639_1 : undefined,
        a.vote_average,
        a.vote_count
      )
      let bRating = calculateImgRating(
        request.locale,
        typeof b.iso_639_1 === 'string' ? b.iso_639_1 : undefined,
        b.vote_average,
        b.vote_count
      )

      if (aRating > bRating) {
        return -1
      } else if (aRating < bRating) {
        return 1;
      }

      return NaN;
    })?.[0]

    if (topBackdrop && topBackdrop.file_path) {
      status.newData.backdrops = {
        default: {
          img: {
            path: '/t/p/original' + topBackdrop.file_path,
            domain: 'image.tmdb.org',
            https: true,
            height: topBackdrop.height,
            width: topBackdrop.width
          },
          lang: typeof topBackdrop.iso_639_1 === 'string' ? topBackdrop.iso_639_1 : null,
        },
        total: fetchedImagesData.backdrops?.length || 0
      }
    }

    status.addPatch()

    const topPosters = fetchedImagesData.posters?.sort((a, b) => {
      let aRating = calculateImgRating(
        request.locale,
        typeof a.iso_639_1 === 'string' ? a.iso_639_1 : undefined,
        a.vote_average,
        a.vote_count
      )
      let bRating = calculateImgRating(
        request.locale,
        typeof b.iso_639_1 === 'string' ? b.iso_639_1 : undefined,
        b.vote_average,
        b.vote_count
      )

      if (aRating > bRating) {
        return -1
      } else if (aRating < bRating) {
        return 1;
      }

      return NaN;
    })?.[0]

    if (topPosters && topPosters.file_path) {
      status.newData.posters = {
        default: {
          img: {
            path: '/t/p/original' + topPosters.file_path,
            domain: 'image.tmdb.org',
            https: true,
            height: topPosters.height,
            width: topPosters.width
          },
          lang: typeof topPosters.iso_639_1 === 'string' ? topPosters.iso_639_1 : null,
        },
        total: fetchedImagesData.backdrops?.length || 0,
        more: fetchedImagesData.posters?.map((p) => {
          if (p.file_path) {
            return {
              https: true,
              domain: 'image.tmdb.org',
              path: '/t/p/original' + p.file_path,
              height: p.height,
              width: p.width
            }
          }
          return null
        }).filter(p => p !== null) || []
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