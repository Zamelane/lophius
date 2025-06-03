'use server'

import { and, db, eq, isNull, or, sql } from 'database'
import { lists, userListMedias, userLists } from 'database/schemas/lists'
import type { MediaType } from 'database/schemas/media_types'
import type { List } from '../types'

// Возвращает списки конкретного пользователя для конкретного типа медиа
export async function getUserLists(userId: number, mediaType: MediaType) {
  const totalLiteral = db
    .select({
      total: sql<number>`count(${userListMedias.mediaId})`.as('total')
    })
    .from(userListMedias)
    .where(
      and(
        eq(userListMedias.listId, lists.id),
        eq(userListMedias.userId, userId)
      )
    )
    .as('total_literal')

  const rows = await db
    .select()
    .from(lists)
    .where(
      and(
        or(isNull(lists.authorId), eq(lists.authorId, userId)),
        eq(lists.mediaType, mediaType)
      )
    )
    .leftJoin(
      userLists,
      and(eq(userLists.listId, lists.id), eq(userLists.userId, userId))
    )
    .orderBy(userLists.order, lists.order)
    .innerJoinLateral(totalLiteral, sql`true`)

  const result: List[] = []

  for (const row of rows) {
    const list = row.lists
    const userList = row.user_lists
    result.push({
      id: list.id,
      order: list.order || undefined,
      title: list.title,
      i18nTitle: list.i18nTitleKey,
      mediaType: list.mediaType,
      isHidden: userList?.isHidden ?? false,
      isSystem: list.authorId === null,
      comment: userList?.comment ?? '',
      total: Number(row.total_literal.total)
    })
  }

  return result
}
