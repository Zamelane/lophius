import { TranslateItem } from "@/interfaces"
import { translates } from "@/database/schemas/translates"
import { db, eq, and, notInArray, TransactionParam } from "database"

import { CountryManager } from "./country-manager"
import { LanguageManager } from "./language-manager"

export class TranslateManager {
  public static async create(data: TranslateItem & TransactionParam):Promise<TranslateItem> {
    return data.tx.insert(translates).values({
      ...data
    }).returning().then(v => v[0])
  }

  public static async DeleteIfNotArray({
    tx,
    mediaId,
    translateIds
  }: TransactionParam & {
    translateIds: number[]
    mediaId: number
  }) {
    tx.delete(translates).where(
      and(
        eq(translates.mediaId, mediaId),
        notInArray(translates.id, translateIds)
      )
    )
  }

  public static async getTranslateByLanguageId({
    mediaId,
    countryId,
    languageId
  }: {
    mediaId: number
    languageId: number
    countryId: number
  }): Promise<TranslateItem | undefined> {
    return db.select().from(translates).where(
      and(
        eq(translates.languageId, languageId),
        eq(translates.countryId, countryId),
        eq(translates.mediaId, mediaId)
      )
    ).limit(1).then(v => v.length ? v[0] : undefined)
  }

  // TODO: учитывать isPartial ???
  public static async saveTranslate({
    tx,
    data,
    mediaId
  }: TransactionParam & SaveTranslateProps): Promise<TranslateItem> {
    // Ищем или создаём язык
    let languageId = data.language.id
    if (data.language.id === undefined){
      const lang = await LanguageManager.getOneByISO_639_1(data.language.iso_639_1)
      languageId = lang !== undefined
            ? lang.id
            : await LanguageManager.create({
              tx,
              iso_639_1: data.language.iso_639_1,
              english_name: data.language.englishName,
              native_name: data.language.nativeName ?? null
            }).then(v => v.id)
    }
    // Ищем страну
    let countryId = data.country.id
    if (data.country.id === undefined){
      const country = await CountryManager.GetCountryByISO_3166_1({
        iso_3166_1: data.country.iso_3166_1
      })
      countryId = country !== undefined
        ? country.id
        : await CountryManager.Create({
              tx,
              country: {
                iso_3166_1: data.country.iso_3166_1,
                english_name: data.country.englishName
              }
            }).then(v => v.id)
    }

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
          isOriginal: data.isOriginal ?? existTranslate.isOriginal,
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
      isOriginal: data.isOriginal ?? false
    })
  }

  public static async update(data: TranslateItem & TransactionParam): Promise<TranslateItem> {
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
  data: TranslateData
}

export type TranslateData = {
  homepage?: null | string
  overview?: null | string
  runtime?: null | number
  tagline?: null | string
  title?: null | string
  isOriginal?: boolean
  language: LanguageDataType
  country: CountryDataType
}

export type LanguageDataType = {
  id: number
} | {
  id?: undefined
  iso_639_1: string
  englishName: string
  nativeName: string | undefined
}

export type CountryDataType = {
  id: number
} | {
  id?: undefined
  iso_3166_1: string
  englishName: string
}