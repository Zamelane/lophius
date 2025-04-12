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

    const images = []
    const mediaModel = ctx.mediaModel

    if (ctx.fetchedImagesData) {
      const posters = defaultValue(ctx.fetchedImagesData.posters, [])
      const logos = defaultValue(ctx.fetchedImagesData.logos, [])
      const backdrops = defaultValue(ctx.fetchedImagesData.backdrops, [])

      // Постеры
      for (const image of posters) {
        if (!image.file_path) {
          logger.debug('Пропускаю изображение, т.к. нет пути')
          continue
        }
          const externalPoster = await ctx.sourceMediaService.createPoster(
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
        images.push(externalPoster.externalImage)
      }

      // Задники
      for (const image of posters) {
        if (!image.file_path) {
          logger.debug('Пропускаю изображение, т.к. нет пути')
          continue
        }
        const externalPoster = await ctx.sourceMediaService.createBackdrop(
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
        images.push(externalPoster.externalImage)
      }
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