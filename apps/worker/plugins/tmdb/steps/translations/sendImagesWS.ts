import { TranslatesFetchedDataContext } from '../types'
import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';

type InWith = TranslatesFetchedDataContext & {
  request: ParseRequest
  status: ParseStatus
}

type OutWith = InWith

export class SendImagesWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedTranslatesData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    fetchedTranslatesData.translations?.map(t => {
      if (t.data) {
        if ((!status.newData.title
          || status.newData.title.lang !== request.locale
          && t.iso_639_1 === request.locale
        ) && t.data.title
        ) {
          status.newData.title = {
            lang: t.iso_639_1!,
            text: t.data.title
          }
        }
        // status.newData.meta!.totalTranslations = (status.newData.meta?.totalTranslations ?? 0) + Math.max(accountedTranslate--, 0)

        if (t.data.homepage) {
          if (!status.newData.meta?.homepage?.default) {
            status.newData.meta!.homepage = {
              default: (
                !status.newData.meta?.homepage?.default
                || status.newData.meta.homepage.default.lang !== request.locale
                && t.iso_639_1 === request.locale
              ) ? { href: t.data.homepage, lang: t.iso_639_1 || null } : status.newData.meta.homepage.default,
              total: status.newData.meta?.homepage?.total ?? 1
            }
          }
          status.newData.meta?.homepage?.default
        }

        if ((!status.newData.description
          || status.newData.description.lang !== request.locale && t.iso_639_1 === request.locale
        ) && t.data.overview
        ) {
          status.newData.description = {
            lang: t.iso_639_1!,
            text: t.data.overview
          }
        }

        if ((!status.newData.description
          || status.newData.description.lang !== request.locale && t.iso_639_1 === request.locale
        ) && t.data.overview
        ) {
          status.newData.description = {
            lang: t.iso_639_1!,
            text: t.data.overview
          }
        }

        if ((!status.newData.tagline
          || status.newData.tagline.lang !== request.locale && t.iso_639_1 === request.locale
        ) && t.data.tagline
        ) {
          status.newData.tagline = {
            lang: t.iso_639_1!,
            text: t.data.tagline
          }
        }
      }
    })

    status.newData.meta.totalTranslations = ctx.fetchedTranslatesData.translations?.length ?? 0

    status.addPatch()
    return ctx
  }
}