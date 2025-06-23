import { Step } from 'src/lib/pipeline'
import { SourceMediaServiceContext } from '../types'
import { MediaModel } from 'database/models/Media/model'
import { OptionalMedia } from 'database'

type InWith = SourceMediaServiceContext & {
  media: OptionalMedia
}

 type OutWith = InWith & {
  mediaModel: MediaModel
 }

export class CreatePrefetchMediaStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    let mediaModel = await ctx.sourceMediaService.findMediaByExternalId(
      ctx.media.external_id
    )

    if (!mediaModel) {
      mediaModel = ctx.sourceMediaService.createMediaWithOriginalTitle(ctx.media)
    } else {
      mediaModel.isVideo = ctx.media.isVideo
      mediaModel.isAdult = ctx.media.isAdult
      mediaModel.mediaType = 'video'
      ctx.sourceMediaService.updateMedia(mediaModel)
    }

    return {
      ...ctx,
      mediaModel
    }
  }
}