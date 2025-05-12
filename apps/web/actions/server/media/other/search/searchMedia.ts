import { and, Column, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { MediaType, PlaceType, SearchResultType } from ".";
import { external_domains, external_images, external_posters, medias, MediasTableType, translates } from "database/schemas";
import { db } from "database";

const limitResults = 10

export async function SearchMedia({
  search,
  place,
  mediaType
}: {
  search: string
  place: PlaceType
  mediaType?: MediaType
}): Promise<SearchResultType> {
  const searchOrderBy = (column: Column) => [
    sql`${column} ILIKE ${search} DESC`,
    sql`${column} ILIKE ${`${search}%`} DESC`,
    sql`${column} ~* ${`\\y${search}\\y`} DESC`,
    sql`similarity(${column}, ${search}) DESC`,
    sql`length(${column}) ASC`
  ]

  // Сначала просто ищем кандидатов на поиск
  const byDetail = await db
  .select({
    mediaIds: sql<number[]>`array_agg(distinct ${medias.id})`,
    mediaTypes: sql<MediasTableType['mediaType'][]>`array_agg(distinct ${medias.mediaType})`,
    count: sql<number>`count(distinct ${medias.id})`,
  })
  .from(
    db
      .select({
        id: medias.id,
        title: translates.title,
        mediaType: medias.mediaType
      })
      .from(medias)
      .innerJoin(translates, eq(translates.mediaId, medias.id))
      .where(sql`${translates.title} % ${search}`)
      .orderBy(...searchOrderBy(translates.title))
      .as("sorted_media")
  );

  if (!byDetail.length || !byDetail[0].mediaTypes.length) {
    return {
      medias: [],
      current: 0,
      total: 0
    }
  }

  const result = byDetail[0]

  console.log(result)

  // Собираем запрос на выборку инфы о каждом типе
  const contains = {
    kino: result.mediaTypes.includes('kino'),
    book: result.mediaTypes.includes('book'),
    comic: result.mediaTypes.includes('comic'),
    music: result.mediaTypes.includes('music'),
  }

  const searchPoster = contains.kino || contains.book || contains.comic

  // Ищем среди переводов
  const translatesSubquery = db
    .select({
      mediaId: translates.mediaId,
      translateTitle: translates.title
    })
    .from(translates)
    .where(sql`${translates.title} % ${search}`)
    .orderBy(...searchOrderBy(translates.title))
    .groupBy(translates.mediaId, translates.title)
    .as('translates_subquery')

  // Ищем среди постеров
  const postersSubquery = db.selectDistinctOn([medias.id], {
    mediaId: medias.id,
    path: external_images.path,
    domain: external_domains.domain,
    https: external_domains.https
  })
  .from(medias)
  .innerJoin(translatesSubquery, eq(translatesSubquery.mediaId, medias.id))
  .innerJoin(external_posters, eq(external_posters.mediaId, medias.id))
  .innerJoin(external_images, eq(external_images.id, external_posters.externalImageId))
  .innerJoin(external_domains, eq(external_domains.id, external_images.externalDomainId))
  .as('posters_subquery')

  let detailedInfo = await db
    .selectDistinctOn([translatesSubquery.mediaId], {
      id: medias.id,
      title: translatesSubquery.translateTitle,
      poster: {
        path: postersSubquery.path,
        domain: postersSubquery.domain,
        https: postersSubquery.https
      },
      // персонализированные для типа медиа поля
      ...((contains.kino || contains.book || contains.comic) && {

      })
    })
    .from(medias)
    .innerJoin(translatesSubquery, eq(translatesSubquery.mediaId, medias.id))
    .innerJoin(postersSubquery, eq(postersSubquery.mediaId, medias.id))
    .where(
      and(
        inArray(medias.id, result.mediaIds),
        isNotNull(translatesSubquery.translateTitle)
      )
    )
    .limit(limitResults)

    console.log(detailedInfo)

  const mediasResult: SearchResultType = {
    medias: [],
    total: result.count,
    current: detailedInfo.length
  }

  for (const media of detailedInfo) {
    mediasResult.medias.push({
      id: media.id,
      title: media.title!,
      poster: media.poster
    })
  }

  return mediasResult

  // // Ищем среди переводов
  // const translatesSubquery = db
  //   .select({
  //     mediaId: translates.mediaId,
  //     translateTitle: translates.title
  //   })
  //   .from(translates)
  //   .where(sql`${translates.title} % ${search}`)
  //   .orderBy(...searchOrderBy(translates.title))
  //   .groupBy(translates.mediaId, translates.title)
  //   .limit(limit)
  //   .as('translates_subquery')

  // // Цепляем медиа по найденным переводам
  // const medias_subquery = db
  //   .selectDistinctOn([medias.id], {
  //     source_id: sql<SourcesTableType['id']>`${sources.id}`.as('source_id'),
  //     source_name: plugin_storage.pluginName,
  //     media_id: sql<MediasTableType['id']>`${medias.id}`.as('media_id'),
  //     media_title: translatesSubquery.translateTitle,
  //     poster: {
  //       path: sql<ExternalImagesTableType['path']>`${external_images.path}`.as('poster_path'),
  //       domain: sql<ExternalDomainsTableType['domain']>`${external_domains.domain}`.as('poster_domain'),
  //       isSSL: sql<ExternalDomainsTableType['https']>`${external_domains.https}`.as('poster_https')
  //     }
  //   })
  //   .from(medias)
  //   .where(
  //     and(
  //       eq(medias.sourceId, sources.id),
  //       mediaType && mediaType !== 'all'
  //         ? eq(medias.mediaType, mediaType)
  //         : undefined
  //     )
  //   )
  //   .innerJoin(translatesSubquery, eq(translatesSubquery.mediaId, medias.id))
  //   .innerJoin(sources, eq(sources.id, medias.sourceId))
  //   .innerJoin(plugin_storage, eq(sources.id, plugin_storage.sourceId))
  //   .leftJoin(external_posters, eq(external_posters.mediaId, medias.id))
  //   .leftJoin(external_images, eq(external_images.id, external_posters.externalImageId))
  //   .leftJoin(external_domains, eq(external_domains.id, external_images.externalDomainId))
  //   .as('medias_subquery')

  // // Сортируем результаты
  // const result = await db
  //   .select()
  //   .from(medias_subquery)
  //   .orderBy((t) => searchOrderBy(t.media_title))

  // const result = await db
  // .select({
  //   source_id: sources.id,
  //   source_name: plugin_storage.pluginName,
  //   media_id: medias.id,
  //   media_title: translatesSubquery.translateTitle
  // })
  // .from(medias)
  // .where(
  //   and(
  //     eq(medias.sourceId, sources.id),
  //     mediaType && mediaType !== 'all'
  //       ? eq(medias.mediaType, mediaType)
  //       : undefined
  //   )
  // )
  // .innerJoin(
  //   translatesSubquery,
  //   eq(translatesSubquery.mediaId, medias.id)
  // )
  // .innerJoin(sources, eq(sources.id, medias.sourceId))
  // .innerJoin(plugin_storage, eq(sources.id, plugin_storage.sourceId))
  // .groupBy(t => [t.media_id, t.media_title, t.source_id, t.source_name])
  // .orderBy(t => [...searchOrderBy(t.media_title)])

  // Группируем под нужную выдачу
}