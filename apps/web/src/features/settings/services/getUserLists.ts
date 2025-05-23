'use server'

import { and, db, eq, isNull, or } from "database";
import { lists, userLists } from "database/schemas/lists";
import { List } from "../types";
import { MediaType } from "database/schemas/media_types";

// Возвращает списки конкретного пользователя для конкретного типа медиа
export async function getUserLists(userId: number, mediaType: MediaType) {
  const rows = await db.select()
    .from(lists)
    .where(and(
      or(isNull(lists.authorId), eq(lists.authorId, userId)),
      eq(lists.mediaType, mediaType)
    ))
    .leftJoin(
      userLists,
      and(
        eq(userLists.listId, lists.id),
        eq(userLists.userId, userId)
      )
    )
    .orderBy(
      userLists.order,
      lists.order
    )
  
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
      comment: userList?.comment ?? ""
    })
  }

  return result
}