'use server'

import { type Column, and, db, eq, sql } from 'database'
import {
  ExternalDomainsTableType,
  ExternalImagesTableType,
  type MediasTableType,
  SourcesTableType,
  external_domains,
  external_images,
  external_posters,
  medias,
  plugin_storage,
  sources,
  translates
} from 'database/schemas'

export type Props = {
  search: string
  place: PlaceType
  objectType: ObjectType
  mediaType?: MediaType
}

export type PlaceType = 'local' | 'ethernet'
export type ObjectType = 'media' | 'personage' | 'person' | 'user'
export type MediaType = 'all' | MediasTableType['mediaType']

const limit = 10

type MediaResultType = {
  id: number
  name: string
  medias: {
    id: number
    title: string
    poster: {
      path: string
      domain: string
      isSSL: boolean
    } | null
  }[]
}

export type SearchResultType = MediaResultType

export async function Search({
  search,
  place,
  mediaType = 'all',
  objectType
}: Props) {
  if (objectType === 'media') {
    return await SearchMedia({
      search,
      place,
      mediaType
    })
  }
}

async function SearchMedia({
  search,
  place,
  mediaType
}: {
  search: string
  place: PlaceType
  mediaType?: MediaType
}) {
  const searchOrderBy = (column: Column) => [
    sql`${column} ILIKE ${search} DESC`,
    sql`${column} ILIKE ${`${search}%`} DESC`,
    sql`${column} ~* ${`\\y${search}\\y`} DESC`,
    sql`similarity(${column}, ${search}) DESC`,
    sql`length(${column}) ASC`
  ]

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
    .limit(limit)
    .as('translates_subquery')

  // Цепляем медиа по найденным переводам
  const medias_subquery = db
    .selectDistinctOn([medias.id], {
      source_id: sql<SourcesTableType['id']>`${sources.id}`.as('source_id'),
      source_name: plugin_storage.pluginName,
      media_id: sql<MediasTableType['id']>`${medias.id}`.as('media_id'),
      media_title: translatesSubquery.translateTitle,
      poster: {
        path: sql<ExternalImagesTableType['path']>`${external_images.path}`.as('poster_path'),
        domain: sql<ExternalDomainsTableType['domain']>`${external_domains.domain}`.as('poster_domain'),
        isSSL: sql<ExternalDomainsTableType['https']>`${external_domains.https}`.as('poster_https')
      }
    })
    .from(medias)
    .where(
      and(
        eq(medias.sourceId, sources.id),
        mediaType && mediaType !== 'all'
          ? eq(medias.mediaType, mediaType)
          : undefined
      )
    )
    .innerJoin(translatesSubquery, eq(translatesSubquery.mediaId, medias.id))
    .innerJoin(sources, eq(sources.id, medias.sourceId))
    .innerJoin(plugin_storage, eq(sources.id, plugin_storage.sourceId))
    .leftJoin(external_posters, eq(external_posters.mediaId, medias.id))
    .leftJoin(external_images, eq(external_images.id, external_posters.externalImageId))
    .leftJoin(external_domains, eq(external_domains.id, external_images.externalDomainId))
    .as('medias_subquery')

  // Сортируем результаты
  const result = await db
    .select()
    .from(medias_subquery)
    .orderBy((t) => searchOrderBy(t.media_title))

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
  const groupped: {
    [key: number | string]: MediaResultType
  } = {}

  for (const row of result) {
    if (
      !row.media_title
    ) {
      continue
    }

    const media = {
      id: row.media_id,
      title: row.media_title,
      poster: (
        row.poster.domain && row.poster.isSSL && row.poster.path
      ) ? row.poster : null
    }

    console.log(media)

    if (!groupped[row.source_id]) {
      groupped[row.source_id] = {
        id: row.source_id,
        name: row.source_name,
        medias: []
      }
    }

    groupped[row.source_id].medias.push(media)
  }

  return Object.keys(groupped).map((key) => groupped[key])
}
