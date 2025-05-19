import { getCurrentLocale } from '@/i18n/current-locale' // Для получения локали пользователя
import { db } from 'database' // Подключение к базе данных
import {
  external_domains,
  external_images,
  external_posters,
  languages,
  medias,
  translates
} from 'database/schemas' // Таблицы и схемы
import { type Column, eq, or, sql } from 'drizzle-orm' // Импорт необходимых функций
import type { MediaType, PlaceType, SearchResultType } from '.' // Типы данных для поиска

const limitResults = 10

// Приоритет для языка
const languagePriority = (langColumn: Column, locale: string) => [
  sql`(${langColumn} = ${locale}) DESC`,
  sql`(${langColumn} = 'en') DESC`
]

// Сортировка по релевантности
const relevanceOrderBy = (searchColumn: Column, search: string) => {
  const exact = search
  const prefix = `${search}%`
  const contains = `%${search}%`
  const wordMatch = `\\y${search}\\y`

  return [
    sql`${searchColumn} ILIKE ${exact} DESC`,
    sql`${searchColumn} ILIKE ${prefix} DESC`,
    sql`${searchColumn} ILIKE ${contains} DESC`,
    sql`${searchColumn} % ${search} DESC`,
    sql`${searchColumn} ~* ${wordMatch} DESC`,
    sql`similarity(${searchColumn}, ${search}) DESC`,
    sql`length(${searchColumn}) = length(${search}) DESC`,
    sql`length(${searchColumn}) DESC`
  ]
}

// Поиск по свопадениям
const searchBy = (searchColumn: Column, search: string) => [
  //sql`${searchColumn} ILIKE ${`%${search}%`}`,
  sql`${searchColumn} % ${search}`
  // sql`${searchColumn} ~* ${`\\y${search}\\y`}`,
  // sql`similarity(${searchColumn}, ${search}) > 0.3`
]

export async function SearchMedia({
  search,
  place,
  mediaType
}: {
  search: string
  place: PlaceType
  mediaType?: MediaType
}): Promise<SearchResultType> {
  const locale = await getCurrentLocale() // Получаем текущую локаль пользователя

  const rankedTranslations = db
    .selectDistinctOn([translates.mediaId], {
      mediaId: translates.mediaId,
      rank: sql<string>`row_number() over (
        order by ${sql.join(
          [...relevanceOrderBy(translates.title, search)],
          sql`, `
        )}
      )`.as('rank')
    })
    .from(translates)
    .leftJoin(languages, eq(languages.id, translates.languageId))
    .where(or(...searchBy(translates.title, search)))
    .orderBy(translates.mediaId)
    .limit(limitResults)
    .as('ranked_translations')

  const literalTranslate = db
    .select({
      title: translates.title,
      language: languages.iso_639_1
    })
    .from(translates)
    .leftJoin(languages, eq(languages.id, translates.languageId))
    .where(eq(translates.mediaId, medias.id))
    .orderBy(
      ...languagePriority(languages.iso_639_1, locale),
      ...relevanceOrderBy(translates.title, search)
    )
    .limit(1)
    .as('literal_translate')

  const literalPosters = db
    .select({
      https: external_domains.https,
      domain: external_domains.domain,
      path: external_images.path
    })
    .from(external_posters)
    .innerJoin(
      external_images,
      eq(external_images.id, external_posters.externalImageId)
    )
    .innerJoin(
      external_domains,
      eq(external_domains.id, external_images.externalDomainId)
    )
    .leftJoin(languages, eq(languages.id, external_images.languageId))
    .where(eq(external_posters.mediaId, medias.id))
    .orderBy(...languagePriority(languages.iso_639_1, locale))
    .limit(1)
    .as('literal_posters')

  const results = await db
    .select({
      mediaId: rankedTranslations.mediaId,
      mediaType: medias.mediaType,
      title: literalTranslate.title,
      language: literalTranslate.language,
      img: {
        https: literalPosters.https,
        domain: literalPosters.domain,
        path: literalPosters.path
      }
    })
    .from(rankedTranslations)
    .innerJoin(medias, eq(rankedTranslations.mediaId, medias.id))
    .innerJoinLateral(literalTranslate, sql`true`)
    .innerJoinLateral(literalPosters, sql`true`)
    .orderBy(rankedTranslations.rank, medias.id)
    .limit(limitResults)

  // Формируем результат
  const mediasResult: SearchResultType = {
    medias: [],
    total: 0,
    current: 0
  }

  for (const media of results) {
    mediasResult.medias.push({
      id: media.mediaId,
      title: media.title!,
      poster: media.img ?? null,
      mediaType: media.mediaType
    })
  }

  return mediasResult
}
