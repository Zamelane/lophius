import type { Context } from '@plugins/tmdb/types.ts'
import { MediaModel } from 'database/models/Media/model'
import { Step } from 'src/lib/pipeline'
import { FetchedMovieDetailsContext, SourceMediaServiceContext } from '../types'

type InWith = FetchedMovieDetailsContext
  & SourceMediaServiceContext
  & {
    mediaModel: MediaModel
  }

type OutWith = InWith

export class SetGenresStep implements Step<InWith, OutWith> {
  async execute(ctx: InWith): Promise<OutWith> {
    if (ctx.fetchedMovieDetails.genres) {
      const genres = []
      for (const genre of ctx.fetchedMovieDetails.genres) {
        if (!genre.name) continue
        const savedGenre = ctx.sourceMediaService.createIfNotExistGenre({
          english_name: genre.name
        })
        ctx.sourceMediaService.linkGenreByMedia(ctx.mediaModel, savedGenre)
        genres.push(savedGenre)
      }
      ctx.sourceMediaService.deleteGenresIfNotInArray(ctx.mediaModel, genres)
    }

    return ctx
  }
}