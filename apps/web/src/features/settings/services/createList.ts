'use server'

import { getCurrentUser } from "@/src/shared/lib/dal";
import { List } from "../types";
import { db, WithOptional } from "database";
import { lists, userLists } from "database/schemas/lists";

export async function createList(list: WithOptional<List, 'id' | 'i18nTitle' | 'isSystem'>) {
  const user = await getCurrentUser()

  if (!user || !list.mediaType) {
    return
  }

  const [newList] = await db.insert(lists)
    .values({
      authorId: user.id,
      mediaType: list.mediaType,
      order: list.order,
      title: list.title
    })
    .returning()

  await db.insert(userLists)
    .values({
      listId: newList.id,
      userId: user.id,
      comment: list.comment,
      isHidden: list.isHidden
    })
    .onConflictDoUpdate({
      target: [userLists.listId, userLists.userId],
      set: {
        comment: list.comment,
        isHidden: list.isHidden
      }
    })

  return newList.id
}