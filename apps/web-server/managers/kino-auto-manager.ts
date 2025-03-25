import { TransactionParam } from "@/db"
import { Media, MediasTableType, StatusesEnumType, CountriesTableType } from "@/db/tables"
import {
  Genre,
  Company,
  Country,
  Language,
  SourceGenre,
  ExternalFile,
  WithRequired,
  TranslateItem,
  compareObjects,
  PartialStatusType
} from "@/interfaces"

import { MediaManager } from "./media-manager"
import { GenreManager } from "./genre-manager"
import { CountryManager } from "./country-manager"
import { ReleaseDateManager } from "./release-date-manager"
import { StatusesManager } from "./statuses-manager"
import { MediaBudgetManager } from "./media-budget-manager"
import { RevenueManager } from "./revenue-manager"
import { MediaVotesManager } from "./media-votes-manager"
import { ProductionCompanyManager } from "./production-company-manager"

export class KinoAutoManager {
  public static async _autoAddGenresByMedia({
    tx,
    media,
    genres,
    sourceId,
    isMediaNew
  }: TransactionParam & {
    genres: GenresDataType
    isMediaNew: boolean
    media: MediasTableType
    sourceId: number
  }) {
    if (genres && ((genres.values && genres.values.length) || !isMediaNew)) {
      if (!isMediaNew && !genres.isPartial) {
        // Удаляем из базы все связи медиа с жанрами, у которых другой внешний id
        await GenreManager.RemoveAllByMediaIdIfNotInExternalIdArray({
          tx,
          mediaId: media.id!,
          externalIds: genres.values?.map(v => v.external_id) ?? []
        })
      }

      // Если есть жанры
      if (genres && genres.values) {
        // Перебираем все жанры
        for (const genre of genres.values) {
          // Ищем или создаём жанры
          const publicGenreId = await GenreManager.CreateSourceGenreAuto({
            tx,
            genre: {
              sourceId,
              external_id: genre.external_id,
              english_name: genre.english_name
            }
          })
          // Связываем жанры с медиа
          await GenreManager.LinkGenreAndMedia({
            tx,
            mediaId: media.id!,
            genreId: publicGenreId
          })
        }
      }
      // TODO: неплохо бы было оптимизировать, чтобы перед запросом
      // к базе проверить, какие жанры точно не находятся в базе
    }
  }

  public static async _autoSavePrimaryReleaseDate({
    tx,
    media,
    isMediaNew,
    primary_release_date
  }: TransactionParam & {
    media: MediasTableType
    isMediaNew: boolean
    primary_release_date: null | PrimaryReleaseDateType
  }) {
    if (isMediaNew && primary_release_date || !isMediaNew) {
      let existCountry: CountriesTableType|undefined
      if (primary_release_date) {
        existCountry = await CountryManager.GetOneByISO_3166_1(primary_release_date.country.iso_3166_1)
        existCountry ??= await CountryManager.Create({
          tx,
          iso_3166_1: primary_release_date.country.iso_3166_1,
          english_name: primary_release_date.country.english_name
        })
      }

      if (existCountry && primary_release_date) { // Создаём/обновляем дату релиза
        if (!primary_release_date.isPartial) {
          // Тут удаляем все, которые не содержатся
          await ReleaseDateManager.DeleteAllIfNotIncludeCountries({
            tx,
            mediaId: media.id,
            countries_iso_3166_1: [primary_release_date.country.iso_3166_1]
          })
        }
        const date = primary_release_date.date
        await ReleaseDateManager.Create({
          tx,
          data: {
            mediaId: media.id,
            countryId: existCountry.id,
            date: typeof date === 'string' ? date : date.toISOString()
          }
        })
      } else if (primary_release_date?.isPartial === false && !isMediaNew) { // Если всё пустое и это полная инфа, то сносим
        await ReleaseDateManager.DeleteAllByMediaId({
          tx,
          mediaId: media.id!
        })
      }
    }
  }

  public static async _updateIfNotEquil({
    tx,
    media_a,
    media_b,
    isMediaNew
  }: TransactionParam & {
    media_a: WithRequired<Media, 'id'>
    media_b: Media,
    isMediaNew: boolean
  }) {
    // Если не только что создали и есть разница, то обновляем
    if (!isMediaNew && !compareObjects(media_a, media_b, ['id'])) {
      await MediaManager.update({
        tx,
        data: media_b,
        mediaId: media_a.id!
      })
    }
  }

  public static async save({
    tx,
    type,
    vote,
    logos,
    status,
    budget,
    genres,
    isAdult,
    isVideo,
    revenue,
    category,
    sourceId,
    isPartial,
    backdrops,
    translates,
    external_id,
    primary_logo,
    original_title,
    origin_countries,
    primary_backdrop,
    spoken_languages,
    original_language,
    primary_release_date,
    production_companies,
    production_countries
  }: KinoSaveProps & TransactionParam) {
    console.log(type) // TODO: сохранение сериалов
    const promises = []
    const media_date = {
      isAdult,
      isVideo,
      sourceId,
      external_id,
      mediaType: category
    }

    const { media, isMediaNew } = await this._getOrCreateMedia({
      tx,
      sourceId,
      external_id,
      data: media_date
    })

    // Если не только что создали и есть разница, то обновляем
    await this._updateIfNotEquil({
      tx,
      isMediaNew,
      media_a: media,
      media_b: media_date
    })

    // Сохраняем релиз
    promises.push(this._autoSavePrimaryReleaseDate({
      tx,
      media,
      isMediaNew,
      primary_release_date
    }))

    // Если есть жанр или медиа не новое
    if (genres)
      promises.push(this._autoAddGenresByMedia({
        tx,
        media,
        genres,
        sourceId,
        isMediaNew
      }))
    
    // Сохраняем статус
    promises.push(StatusesManager.SaveStatusByMedia({
      tx,
      status,
      mediaId: media.id
    }))

    // Сохраняем бюджет
    if (budget || !isPartial) {
      promises.push(MediaBudgetManager.Save({
        tx,
        mediaId: media.id,
        budget: budget ?? null
      }))
    }

    // Сохраняем доход
    if (revenue || !isPartial) {
      promises.push(RevenueManager.Save({
        tx,
        mediaId: media.id,
        revenue: revenue ?? null
      }))
    }

    // Сохраняем внешнии оценки
    if (vote) {
      promises.push(MediaVotesManager.Save({
        tx,
        ...vote,
        mediaId: media.id,
      }))
    }

    // Сохраняем компании
    if (production_companies) {
      promises.push(this._saveProductionCompanies({
        tx,
        sourceId,
        isPartial,
        mediaId: media.id,
        production_companies
      }))
    }

    
    // Ждём полного завершения сохранения
    await Promise.all(promises)
  }

  private static async _getOrCreateMedia({
    tx,
    data,
    sourceId,
    external_id
  }: TransactionParam & {
    data: Media,
    sourceId: number
    external_id: string
  }): Promise<{
    media: MediasTableType
    isMediaNew: boolean
  }> {
    const media = await MediaManager.getByExternalId({
      sourceId,
      external_id
    })

    if (media)
      return {
        media,
        isMediaNew: false
      }
    
    return {
      isMediaNew: true,
      media: await MediaManager.create({ tx, data })
    }
  }
  
  private static async _saveProductionCompanies({
    tx,
    mediaId,
    sourceId,
    isPartial,
    production_companies
  }: TransactionParam & {
    production_companies: (Company & PartialStatusType)[]
    sourceId: number
    mediaId: number
    isPartial: boolean
  }) {
    // Сохраняем компании
    if (production_companies) {
      // Сохраняем переданные компании и привязываем
      for (const company of production_companies) {
        const saveCompany = await ProductionCompanyManager.Save({
          tx,
          company,
          sourceId,
          isPartial: company.isPartial
        })
        await ProductionCompanyManager.LinkByMediaId({
          tx,
          mediaId,
          companyId: saveCompany.id
        })
      }
      if (!isPartial) {
        // Отвязываем компании, которых нет в списке
        await ProductionCompanyManager.UnlinkByMediaIdIfExternalIdNotInArray({
          tx,
          mediaId,
          externalIds: production_companies.map(v => v.external_id)
        })
      }
    }
  }
}

type PrimaryInfo = {
  sourceId: number
}

type PrimaryReleaseDateType = PartialStatusType & {
  date: Date|string
  country: Country
}

type GenresDataType = PartialStatusType & { values?: (Genre & SourceGenre)[] }

type KinoSaveProps = PrimaryInfo & PartialStatusType & PrimaryValuesKinoSaveProps & {
  vote?: {
    avg: number
    avg_max: number
    count: null|number
  }
  spoken_languages?: Language[]
  revenue?: null|number
  origin_countries?: Country[]
  production_countries?: Country[]
  production_companies?: (Company & PartialStatusType)[]
  primary_release_date: null | PrimaryReleaseDateType
  primary_logo?: ExternalFile
  primary_backdrop?: ExternalFile
  logos?: ExternalFile[]
  backdrops?: ExternalFile[]
  genres?: GenresDataType
  budget?: null|number
}

type PrimaryValuesKinoSaveProps = KeysBySerialSaveProps & {
  category: 'anime' | 'kino'
  type: 'film' | 'serial'
  original_language: {
    languageId: number
  } | {
    languageId?: undefined
    language_iso_639_1: string
    english_name: string
    native_name?: string
  }
  original_title: null|string
  status: null | StatusesEnumType
  translates: TranslateItem[]
  isVideo: boolean|null
  isAdult: boolean
  external_id: string
}

type KeysBySerialSaveProps = {
  type: 'film'
  runtime: number
} | {
  type: 'serial'
}