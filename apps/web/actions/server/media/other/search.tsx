'use server'

import { and, db, eq, sql } from 'database'
import {
  type MediasTableType,
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
  const result = await db
    .select()
    .from(sources)
    .innerJoin(plugin_storage, eq(sources.id, plugin_storage.sourceId))
    .innerJoin(
      medias,
      and(
        eq(medias.sourceId, sources.id),
        mediaType && mediaType !== 'all'
          ? eq(medias.mediaType, mediaType)
          : undefined
      )
    )
    .innerJoin(
      translates,
      and(
        eq(translates.mediaId, medias.id),
        sql`${translates.title} % ${search}`
      )
    )
    .groupBy(sources.id, plugin_storage.sourceId, medias.id, translates.id)
    .orderBy(
      sql`${translates.title} ILIKE ${search} DESC`,
      sql`${translates.title} ILIKE ${`${search}%`} DESC`,
      sql`${translates.title} ~* ${`\\y${search}\\y`} DESC`,
      sql`similarity(${translates.title}, ${search}) DESC`,
      sql`length(${translates.title}) ASC`
    )
    .limit(limit)

  // Группируем под нужную выдачу
  const groupped: {
    [key: number | string]: MediaResultType
  } = {}

  for (const row of result) {
    if (!row.plugin_storage) {
      continue
    }

    const media = {
      id: row.medias.id,
      title: row.translates.title ?? 'Нету'
    }

    if (!groupped[row.sources.id]) {
      groupped[row.sources.id] = {
        id: row.sources.id,
        name: row.plugin_storage.pluginName,
        medias: []
      }
    }

    groupped[row.sources.id].medias.push(media)
  }

  return Object.keys(groupped).map((key) => groupped[key])
}
