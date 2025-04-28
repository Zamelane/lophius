import {Context} from "@plugins/tmdb/types.ts";
import {defaultValue} from "@plugins/tmdb/utils.ts";
import {logger, PartialExternalDomain} from "database";

const imageCDN = "https://image.tmdb.org/t/p/original"
const subPath  = "/t/p/original"

export async function setImages(ctx: Context): Promise<Context> {
    if (!ctx.mediaModel)
        throw new Error('Media model missing');

    if (!ctx.fetchedImagesData)
        throw new Error('Fetched ImagesData missing');

    const mediaModel = ctx.mediaModel

    if (ctx.fetchedImagesData) {
      const posters = defaultValue(ctx.fetchedImagesData.posters, [])
      const logos = defaultValue(ctx.fetchedImagesData.logos, [])
      const backdrops = defaultValue(ctx.fetchedImagesData.backdrops, [])
      
      const referencePosters = []
      const referenceLogos = []
      const referenceBackdrops = []

      // Постеры
      for (const image of posters) {
        if (!image.file_path) {
          logger.debug('Пропускаю изображение, т.к. нет пути')
          continue
        }
        const language = !image.iso_639_1
          ? null
          : ctx.sourceMediaService.languageService.createLanguage({
            iso_639_1: image.iso_639_1
          })
        const externalPoster = await ctx.sourceMediaService.createPoster(
          ctx.mediaModel,
          {
              externalDomain: getDomainByUrl(imageCDN),
              language,
              path: subPath + image.file_path,
              height: image.height ?? null,
              width: image.width ?? null,
              vote_count: image.vote_count ?? null,
              vote_avg: typeof image.vote_average === 'number' && !isNaN(image.vote_average)
                ? image.vote_average.toString()
                : null
          }
        )
        referencePosters.push(externalPoster)
      }

      // Задники
      for (const image of backdrops) {
        if (!image.file_path) {
          logger.debug('Пропускаю изображение, т.к. нет пути')
          continue
        }
        const externalBackdrop = await ctx.sourceMediaService.createBackdrop(
          ctx.mediaModel,
          {
            externalDomain: getDomainByUrl(imageCDN),
            language: null,
            path: subPath + image.file_path,
            height: image.height ?? null,
            width: image.width ?? null,
            vote_count: image.vote_count ?? null,
            vote_avg: typeof image.vote_average === 'number' && !isNaN(image.vote_average)
              ? image.vote_average.toString()
              : null
          }
        )
        referenceBackdrops.push(externalBackdrop)
      }

      // Логотипы
      for (const image of logos) {
        if (!image.file_path) {
          logger.debug('Пропускаю изображение, т.к. нет пути')
          continue
        }
        const externalBackdrop = await ctx.sourceMediaService.createLogo(
          ctx.mediaModel,
          {
            externalDomain: getDomainByUrl(imageCDN),
            language: null,
            path: subPath + image.file_path,
            height: image.height ?? null,
            width: image.width ?? null,
            vote_count: image.vote_count ?? null,
            vote_avg: typeof image.vote_average === 'number' && !isNaN(image.vote_average)
              ? image.vote_average.toString()
              : null
          }
        )
        referenceLogos.push(externalBackdrop)
      }

      ctx.sourceMediaService.deleteNotInBackdrops(ctx.mediaModel, referenceBackdrops)
      ctx.sourceMediaService.deleteNotInLogos(ctx.mediaModel, referenceLogos)
      ctx.sourceMediaService.deleteNotInPosters(ctx.mediaModel, referencePosters)
    }

    return ctx
}

function getDomainByUrl(url: string): PartialExternalDomain {
    const urlOBJ = new URL(url)
    return {
        domain: urlOBJ.hostname,
        https: urlOBJ.protocol === 'https'
    }
}