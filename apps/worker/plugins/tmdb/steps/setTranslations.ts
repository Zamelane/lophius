import type { Context } from '@plugins/tmdb/types.ts'

export async function setTranslations(ctx: Context): Promise<Context> {
  if (!ctx.mediaModel) throw new Error('Media model missing')

  if (!ctx.fetchedTranslatesData)
    throw new Error('Fetched TranslatesData missing')

  const translates = []

  if (ctx.fetchedTranslatesData?.translations) {
    for (const translation of ctx.fetchedTranslatesData.translations) {
      if (
        !translation.iso_3166_1 ||
        !translation.iso_639_1 ||
        !translation.data ||
        !translation.data.title
      )
        continue
      const country = ctx.sourceMediaService.countryService.createCountry({
        iso_3166_1: translation.iso_3166_1
      })
      const language = ctx.sourceMediaService.languageService.createLanguage({
        iso_639_1: translation.iso_639_1,
        english_name: translation.english_name,
        native_name: translation.name
      })
      const translatedModel = {
        country,
        language,
        media: ctx.mediaModel,
        homepage: translation.data.homepage ?? null,
        overview: translation.data.overview ?? null,
        runtime: translation.data.runtime ?? 0,
        tagline: translation.data.tagline ?? null,
        title: translation.data.title,
        isOriginal: false
      }
      ctx.sourceMediaService.translateService.addTranslateByMedia(
        translatedModel
      )
      translates.push(translatedModel)
    }
  }

  const translate = translates.find(
    (v) => v.language.iso_639_1 === ctx?.fetchedData?.original_language
  )
  if (!translate) {
    if (!ctx.fetchedData.original_language || !ctx.fetchedData.title) return ctx

    const language = ctx.sourceMediaService.languageService.createLanguage({
      iso_639_1: ctx.fetchedData.original_language
    })
    ctx.sourceMediaService.translateService.addTranslateByMedia({
      language,
      media: ctx.mediaModel,
      homepage: null,
      overview: ctx.fetchedData.overview ?? null,
      runtime: 0,
      tagline: null,
      title: ctx.fetchedData.title,
      isOriginal: true
    })
  } else {
    translate.isOriginal = true
  }

  return ctx
}
