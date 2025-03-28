import { allFieldsDefined, ArrayElementType, GetPropertyType } from "@/interfaces";
import { DiscoverMovieResponse } from "../client";
import { db, Transaction } from "database";
import { LoadMovieDetailed } from "../routesLoaders/loadMovieDetailed";
import { LoadImages } from "../routesLoaders/loadImages";
import { LoadReleaseDates } from "../routesLoaders/loadRelease";
import { LoadTranslations } from "../routesLoaders/loadTranslations";
import {SourceMediaService} from "database/src/services/SourceMediaService.ts";
import _ from "lodash";
import {logger} from "../../../src";

export async function saveMovies(moviesData: DiscoverMovieResponse, sourceId: number, token: string) {
  if (!moviesData.results)
    throw new Error(`Сервер не вернул список фильмов`)

  for (const movie of moviesData.results) {
    await db.transaction(async (tx) => {
      await saveMovie(movie, sourceId, token, tx)
    })
  }
}

export async function saveMovie(
  movie: ArrayElementType<GetPropertyType<DiscoverMovieResponse, 'results'>>,
  sourceId: number,
  token: string,
  tx: Transaction
) {
  if (!allFieldsDefined(movie))
    throw new Error(`Некорректный ответ от сервера при сохранении фильма`)

  const {
    id: external_id,
    adult: isAdult,
    genre_ids,
    release_date,
    original_language,
    original_title,
    overview,
    vote_average,
    vote_count,
    poster_path,
    backdrop_path,
    video: isVideo,
    title
  } = movie

  const pDetailed = LoadMovieDetailed({
    id: external_id,
    token
  })

  const pImages = LoadImages({
    id: external_id,
    token
  })

  const pReleases = LoadReleaseDates({
    id: external_id,
    token
  })

  const pTranslations = LoadTranslations({
    id: external_id,
    token
  })

  const detailed = await pDetailed
  const images = await pImages
  const releases = await pReleases
  const translations = await pTranslations

  const service = new SourceMediaService(sourceId)

  const lang = _.head(detailed.spoken_languages)
  const languageModel = service.languageService.createLanguage({
    native_name: lang?.name,
    iso_639_1: lang?.iso_639_1 ?? detailed.original_language,
    english_name: lang?.english_name
  })

  const country = _.head(detailed.production_countries)!
  const countryModel = country?.iso_3166_1 || detailed.origin_country.length ? service.countryService.createCountry({
    iso_3166_1: country?.iso_3166_1 ?? _.head(detailed.origin_country)!,
    english_name: country?.name
  }) : undefined

  if (await service.findMediaByExternalId(detailed.id!.toString()))
    return

  const mediaModel = service.createMediaWithOriginalTitle({
    media: {
      external_id: detailed.id!.toString(),
      isAdult: detailed.adult!,
      isVideo: detailed.video!,
      mediaType: 'kino',
    },
    language: languageModel,
    country: countryModel,
    title
  })

  await service.commit()

  // const origin_country = (detailed as (typeof detailed & {
  //   origin_country: string[]
  // })).origin_country[0]
  //
  // await KinoAutoManager.save({
  //   category: 'kino',
  //   type: 'film',
  //   external_id: external_id.toString(),
  //   isAdult,
  //   isPartial: false,
  //   isVideo,
  //   // primary_release_date: {
  //   //   date: detailed.release_date,
  //   //   country: {
  //   //     english_name: detailed.production_countries[detailed.production_companies.length].name!,
  //   //     iso_3166_1: detailed.production_countries[detailed.production_companies.length].iso_3166_1!
  //   //   },
  //   //   isPartial: false
  //   // },
  //   runtime: detailed.runtime,
  //   sourceId,
  //   status: null,
  //   translates: translations!.translations!.map(v => ({
  //     country: {
  //       iso_3166_1: v.iso_3166_1!,
  //       englishName: ''
  //     },
  //     language: {
  //       iso_639_1: v.iso_639_1!,
  //       englishName: v.english_name!,
  //       nativeName: v.name!
  //     },
  //     homepage: v.data!.homepage!,
  //     isOriginal: false,
  //     overview: v.data!.overview!,
  //     runtime: v.data!.runtime!,
  //     tagline: v.data!.tagline!,
  //     title: v.data!.title!
  //   })),
  //   backdrops: images!.backdrops!.map(v => ({
  //     domain: 'image.tmdb.org',
  //     https: true,
  //     height: v.height!,
  //     width: v.width!,
  //     path: v.file_path!,
  //     vote_avg: v.vote_average!.toString(),
  //     vote_count: v.vote_count!,
  //     sourceId
  //   })),
  //   budget: detailed.budget,
  //   primary_poster: {
  //     domain: 'image.tmdb.org',
  //     https: true,
  //     path: detailed.poster_path,
  //     height: null,
  //     width: null,
  //     vote_avg: null,
  //     vote_count: null,
  //     sourceId
  //   },
  //   genres: {
  //     isPartial: false,
  //     values: detailed!.genres!.map(v => ({
  //       english_name: v.name!,
  //       external_id: v.id!.toString(),
  //       sourceId
  //     }))
  //   },
  //   origin_countries: [
  //     {
  //       iso_3166_1: origin_country,
  //       english_name: '????????????????'
  //     }
  //   ],
  //   posters: images!.posters!.map(v => ({
  //     domain: 'image.tmdb.org',
  //     https: true,
  //     height: v.height!,
  //     width: v.width!,
  //     path: v.file_path!,
  //     vote_avg: v.vote_average!.toString(),
  //     vote_count: v.vote_count!,
  //     sourceId
  //   })),
  //   primary_backdrop: {
  //     domain: 'image.tmdb.org',
  //     https: true,
  //     path: detailed.backdrop_path,
  //     height: null,
  //     width: null,
  //     vote_avg: null,
  //     vote_count: null,
  //     sourceId
  //   },
  //   production_companies: detailed.production_companies.map(v => ({
  //     name: v.name!,
  //     description: null,
  //     external_id: v.id!.toString(),
  //     homepage: null,
  //     isPartial: true,
  //     sourceId,
  //     logoExternalFileId: null,
  //     originCountryId: null,
  //     parentCompanyId: null
  //   })),
  //   production_countries: detailed.production_countries.map(v => ({
  //     english_name: v.name!,
  //     iso_3166_1: v.iso_3166_1!
  //   })),
  //   revenue: detailed.revenue!,
  //   spoken_languages: detailed.spoken_languages.map(v => ({
  //     english_name: v.english_name!,
  //     iso_639_1: v.iso_639_1!,
  //     native_name: v.name!
  //   })),
  //   tx
  // })
  
}