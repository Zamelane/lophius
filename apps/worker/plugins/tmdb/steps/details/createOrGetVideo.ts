import type { Context } from '@plugins/tmdb/types.ts'

export class CreateOrGetVideoStep {
  async execute(ctx: Context): Promise<Context> {
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

    ctx.mediaModel = media

    return ctx
  }
}
