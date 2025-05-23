'use server'

import { getCurrentUser } from "@/src/shared/lib/dal";
import { List } from "../types";
import { db, eq, WithOptional } from "database";
import { lists, userLists } from "database/schemas/lists";

export async function saveList(list: WithOptional<List, 'i18nTitle' | 'isSystem'>) {
  const user = await getCurrentUser()

  if (!user) {
    return
  }

  await db.update(lists)
    .set({
      title: list.title
    })
    .where(eq(lists.authorId, user.id))

  await db.insert(userLists)
    .values({
      listId: list.id,
      userId: user.id,
      comment: list.comment,
      isHidden: list.isHidden,
      order: list.order
    })
    .onConflictDoUpdate({
      target: [userLists.listId, userLists.userId],
      set: {
        comment: list.comment,
        isHidden: list.isHidden
      }
    })
}