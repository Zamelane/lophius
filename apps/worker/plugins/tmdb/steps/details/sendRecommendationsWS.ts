import { Step } from 'src/lib/pipeline';
import { ParseRequest } from 'src/search/interfaces';
import { ParseStatus } from 'src/search/parse-status';
import { MovieRecommendationsDataContext } from '../types';
import { createPrefetchMediaPipeline } from '@plugins/tmdb/utils/pipelineFactory';
import { TMDBPlugin } from '@plugins/tmdb/plugin';
import { MediaModel } from 'database/models/Media/model';

type InWith = MovieRecommendationsDataContext & {
  request: ParseRequest
  status: ParseStatus
  plugin: TMDBPlugin
}

type OutWith = InWith

export class SendRecommendationsWS implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {

    const { fetchedRecommendationsData, status, request } = ctx

    if (!status.newData.meta) {
      status.newData.meta = {}
    }

    if (fetchedRecommendationsData) {
      //status.newData.meta.recommendations =
      const promises = fetchedRecommendationsData.results?.map(async (r) => {
        // const result = await createPrefetchMediaPipeline(ctx.plugin, {
        //   // @ts-ignore
        //   contentType: r?.media_type === 'movie' ? 'film' : 'serial',
        //   isAdult: r?.adult || true,
        //   mediaType: 'video',
        //   external_id: r.id!.toString(),
        //   isVideo: r.video || false,
        //   sourceId: ctx.plugin.storage.sourceId,
        //   mediaStatus: 'preliminary'
        // }).execute()

        const data = {
          id: r.id!,
          title: {
            text: r.title!,
            lang: request.locale
          },
          poster: {
            lang: request.locale,
            img: {
              domain: 'image.tmdb.org',
              path: `/t/p/original${r.poster_path}`,
              https: true
            }
          }
        }

        if (status.newData.meta?.recommendations?.length) {
          status.newData.meta?.recommendations.push(data)
        } else {
          status.newData.meta!.recommendations = [data]
        }
      }) || []

      await Promise.all(promises)
    }

    status.addPatch()

    return ctx
  }
}