import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { MovieFetchedDataContext, SourceMediaServiceContext } from '../types'

type InStep = MovieFetchedDataContext
  & SourceMediaServiceContext

type OutStep = InStep & {
  mediaModel: MediaModel
}

export class CreateOrGetVideoStep<Context> implements Step<InStep, OutStep> {
  async execute(ctx: InStep): Promise<OutStep> {
    const { id, adult, video, original_language } = ctx.fetchedData

    if (
      !id ||
      adult === undefined ||
      video === undefined ||
      !original_language
    ) {
      throw new Error(
        `Id or another fields not provided: ${JSON.stringify(ctx.fetchedData)}`
      )
    }

    const stringId = id.toString()

    let media = await ctx.sourceMediaService.findMediaByExternalId(stringId)

    if (!media) {
      media = ctx.sourceMediaService.createMediaWithOriginalTitle({
        external_id: stringId,
        isAdult: adult,
        isVideo: video,
        mediaType: 'video',
        mediaStatus: 'ready',
        contentType: 'film'
      })
    } else {
      media.external_id = stringId
      media.isVideo = video
      media.isAdult = adult
      media.mediaType = 'video'
      ctx.sourceMediaService.updateMedia(media)
    }

    return {
      ...ctx,
      mediaModel: media
    }
  }
}
