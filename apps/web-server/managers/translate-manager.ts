import { TranslateItem } from "@/interfaces"
import { translates } from "@/db/tables/translates"
import { db, eq, and, TransactionParam } from "@/db"

import { CountryManager } from "./country-manager"
import { LanguageManager } from "./language-manager"

export class TranslateManager {
  public static async create(data: TranslateItem & TransactionParam) {
    return data.tx.insert(translates).values({
      ...data
    }).returning().then(v => v[0])
  }

  public static async getTranslateByLanguageId({
    mediaId,
    countryId,
    languageId
  }: {
    mediaId: number
    languageId: number
    countryId: number
  }) {
    return db.select().from(translates).where(
      and(
        eq(translates.languageId, languageId),
        eq(translates.countryId, countryId),
        eq(translates.mediaId, mediaId)
      )
    ).limit(1).then(v => v.length ? v[0] : undefined)
  }

  public static async saveTranslate({
    tx,
    data,
    mediaId
  }: TransactionParam & SaveTranslateProps) {
    // Ищем или создаём язык
    const languageId = data.languageId
      ?? await LanguageManager.getOneByISO_639_1(data.language_iso_639_1)
          .then(async v => v
            ? v
            : await LanguageManager.create({
              tx,
              iso_639_1: data.language_iso_639_1,
              english_name: data.languageEnglishName,
              native_name: data.languageNativeName ?? null
            })
          ).then( v => v.id)

    // Ищем страну
    const countryId = data.countryId
      ?? await CountryManager.getOneByISO_3166_1(data.countryLanguage_iso_3166_1)
          .then(async v => v
            ? v
            : await CountryManager.create({
              tx,
              english_name: data.countryEnglishName,
              iso_3166_1: data.countryLanguage_iso_3166_1
            })
          ).then(v => v.id)

    // Сохраняем перевод
    const existTranslate = await this.getTranslateByLanguageId({
      mediaId,
      countryId: countryId!,
      languageId: languageId!
    })

    if (existTranslate) {
      if (
        existTranslate.homepage     != data.homepage
        || existTranslate.overview  != data.overview
        || existTranslate.runtime   != data.runtime
        || existTranslate.title     != data.title
        || existTranslate.tagline   != data.tagline
      ) {
        return await this.update({
          tx,
          mediaId,
          countryId: countryId!,
          languageId: languageId!,
          title: (existTranslate.title || data.title) ?? null,
          runtime: (existTranslate.runtime || data.runtime) ?? 0,
          tagline: (existTranslate.tagline || data.tagline) ?? null,
          homepage: (existTranslate.homepage || data.homepage) ?? null,
          overview: (existTranslate.overview || data.overview) ?? null
        })
      }
      return existTranslate
    }

    return await this.create({
      tx,
      mediaId,
      countryId: countryId!,
      title: data.title ?? "",
      languageId: languageId!,
      runtime: data.runtime ?? 0,
      tagline: data.tagline ?? "",
      homepage: data.homepage ?? "",
      overview: data.overview ?? "",
    })
  }

  public static async update(data: TranslateItem & TransactionParam) {
    return data.tx.update(translates).set({
      ...data
    }).where(
      and(
        eq(translates.mediaId, data.mediaId),
        eq(translates.countryId, data.countryId),
        eq(translates.languageId, data.languageId)
      )
    ).returning().then(v => v[0])
  }
}

type SaveTranslateProps = {
  mediaId: number
  data: CountryDataType & LanguageDataType & {
    homepage?: string
    overview?: string
    runtime?: number
    tagline?: string
    title?: string
  }
}

type LanguageDataType = {
  languageId: number
} | {
  languageId?: undefined
  language_iso_639_1: string
  languageEnglishName: string
  languageNativeName: string | undefined
}

type CountryDataType = {
  countryId: number
} | {
  countryId?: undefined
  countryLanguage_iso_3166_1: string
  countryEnglishName: string
}