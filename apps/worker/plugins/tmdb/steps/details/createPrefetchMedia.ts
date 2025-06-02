import { PrefetchContext } from '../../utils/pipelineFactory'

export class CreatePrefetchMediaStep {
  async execute(ctx: PrefetchContext): Promise<PrefetchContext> {
    let media = await ctx.sourceMediaService.findMediaByExternalId(ctx.media.external_id)

    if (!media) {
      media = ctx.sourceMediaService.createMediaWithOriginalTitle(ctx.media)
    } else {
      media.isVideo = ctx.media.isVideo
      media.isAdult = ctx.media.isAdult
      media.mediaType = 'kino'
      ctx.sourceMediaService.updateMedia(media)
    }

    ctx.media = media

    return ctx
  }
}