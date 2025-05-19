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
import { limitResults } from './config'

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

  const tsVector = sql`to_tsvector('russian', ${searchColumn})`
  const tsQuery = sql`plainto_tsquery('russian', ${search})`

  return [
    sql`${searchColumn} = ${search} DESC`, // Точное совпадение
    sql`${searchColumn} ILIKE ${exact} DESC`, // Полный ILIKE
    sql`${tsVector} @@ ${tsQuery} DESC`, // Полнотекстовый матч
    sql`ts_rank(${tsVector}, ${tsQuery}) DESC`, // Ранжирование по tsvector
    sql`similarity(${searchColumn}, ${search}) DESC`, // Похожесть
    sql`${searchColumn} % ${search} DESC`, // Триграмма
    sql`${searchColumn} ILIKE ${prefix} DESC`, // Начало слова
    sql`${searchColumn} ILIKE ${contains} DESC`, // Вхождение
    sql`${searchColumn} ~* ${wordMatch} DESC`, // Регулярное слово
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
  mediaType,
  offset = 0
}: {
  search: string
  place: PlaceType
  mediaType?: MediaType
  offset?: number
}): Promise<SearchResultType> {
  console.log(offset)
  const locale = await getCurrentLocale() // Получаем текущую локаль пользователя

  // Считаем параллельно, сколько всего записей подходят под условие
  const totalResults = db
    .select({ count: sql<number>`COUNT(DISTINCT ${translates.mediaId})` })
    .from(translates)
    .where(or(...searchBy(translates.title, search)))
    .execute()

  // Ищем медиа по переводам, которые удовлетваряют запросу
  const rankedTranslations = db
    .selectDistinctOn([translates.mediaId], {
      mediaId: translates.mediaId,
      // Сохраняем "оценку", которая будет влиять на порядок в выдаче
      rank: sql<string>`row_number() over (
        order by ${sql.join(
          [...relevanceOrderBy(translates.title, search)],
          sql`, `
        )}
      )`.as('rank')
    })
    .from(translates)
    .leftJoin(languages, eq(languages.id, translates.languageId))
    .where(or(...searchBy(translates.title, search))) // Условия для поиска/выборки
    .orderBy(translates.mediaId)
    //.limit(limitResults)
    .as('ranked_translations')

  // Запрос выбора лучшего перевода для каждой строки медиа, которое будет отдавать
  const literalTranslate = db
    .select({
      title: translates.title,
      language: languages.iso_639_1
    })
    .from(translates)
    .leftJoin(languages, eq(languages.id, translates.languageId))
    .where(eq(translates.mediaId, medias.id)) // Выбираем тот, у которого язык ближе к пользователю
    .orderBy(
      ...languagePriority(languages.iso_639_1, locale),
      ...relevanceOrderBy(translates.title, search)
    )
    .limit(1)
    .as('literal_translate')

  // Запрос выбора лучшего постера для каждой строки медиа, которое будем отдавать
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
    .where(eq(external_posters.mediaId, medias.id)) // Выбираем тот, у которого язык ближе к пользователю
    .orderBy(...languagePriority(languages.iso_639_1, locale))
    .limit(1)
    .as('literal_posters')

  // Итоговая выборка для отдачи
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
      },
      isAdult: medias.isAdult
    })
    .from(rankedTranslations)
    .innerJoin(medias, eq(rankedTranslations.mediaId, medias.id))
    .innerJoinLateral(literalTranslate, sql`true`)
    .leftJoinLateral(literalPosters, sql`true`)
    .orderBy(rankedTranslations.rank, medias.id)
    .offset(offset)
    .limit(limitResults)

  // Формируем результат
  const mediasResult: SearchResultType = {
    medias: [],
    total: (await totalResults)[0].count,
    current: results.length + offset
  }

  for (const media of results) {
    mediasResult.medias.push({
      id: media.mediaId,
      title: media.title!,
      poster: media.img ?? null,
      mediaType: media.mediaType,
      isAdult: media.isAdult
    })
  }

  return mediasResult
}
