import { movieTranslations } from '@plugins/tmdb/client'
import { MovieFetchedDataContext, TranslatesFetchedDataContext } from '../types'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline';

type InWith = MovieFetchedDataContext
& {
  token: string
  mediaModel: MediaModel
}

type OutWith = TranslatesFetchedDataContext & InWith

export class GetTranslationsStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    const { data, error } = await movieTranslations({
      auth: ctx.token,
      path: {
        movie_id: ctx.fetchedData.id!
      }
    })

    if (error || !data)
      throw new Error(
        JSON.stringify({
          error,
          id: ctx.fetchedData.id
        })
      )

    return {
      ...ctx,
      fetchedTranslatesData: data
    }
  }
}