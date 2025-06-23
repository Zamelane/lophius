import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'
import { OptionalMedia, PartialMedia } from 'database'

type InWith = SourceMediaServiceContext & FetchedMovieDetailsContext

 type OutWith = InWith & {
  media: OptionalMedia
 }

export class CreateOptionalMediaByDetailsStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (!ctx.fetchedMovieDetails.id) throw new Error('ctx.fetchedData.id not provided')
    
    const media: PartialMedia = {
      contentType: 'film',
      external_id: ctx.fetchedMovieDetails.id.toString(),
      isAdult: ctx.fetchedMovieDetails.adult || true,
      isVideo: ctx.fetchedMovieDetails.video || false,
      mediaStatus: 'preliminary',
      mediaType: 'video'
    }

    return {
      ...ctx,
      media
    }
  }
}