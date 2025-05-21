import { and, db, isNull, notInArray } from "database"
import { MediaType } from "database/schemas/media_types"
import { lists } from '../../../../packages/database/src/schemas/lists';

type PublicList = {
  defaultTitle: string
  i18nTitleKey: string
  mediaType: MediaType
}

export const publicLists: PublicList[] = [
  { i18nTitleKey: "watching",  defaultTitle: "Watching",   mediaType: 'kino' }, // Смотрю
  { i18nTitleKey: "planned",   defaultTitle: "Planned",    mediaType: 'kino' }, // Буду смотреть
  { i18nTitleKey: "completed", defaultTitle: "Completed",  mediaType: 'kino' }, // Просмотрел
  { i18nTitleKey: "dropped",   defaultTitle: "Dropped",    mediaType: 'kino' }, // Бросил
]

export async function listSeeder() {
  // Определяем, для каких типов медиа анализируем
  const types: MediaType[] = []
  publicLists.map(list => !types.includes(list.mediaType) && types.push(list.mediaType))

  // Сразу сносим те системные типы, которые не описаны в публичных (publicLists)
  if (types.length) {
    await db.delete(lists)
    .where(
      and(
        isNull(lists.authorId),
        notInArray(lists.mediaType, types)
      )
    )
  }

  // Заносим списки в базу
  let order = 1
  for (const list of publicLists) {
    await db.insert(lists)
      .values({
        mediaType: list.mediaType,
        i18nTitleKey: list.i18nTitleKey,
        title: list.defaultTitle,
        order
      })
      .onConflictDoNothing()
      .then(() => order++)
  }
}