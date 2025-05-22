import { and, db, isNull, notInArray } from "database"
import { MediaType } from "database/schemas/media_types"
import { lists } from 'database/src/schemas/lists';

type PublicList = {
  defaultTitle: string
  i18nTitleKey: string
  mediaType: MediaType
}

export const publicLists: PublicList[] = [
  // 🎬 Фильмы и сериалы
  { i18nTitleKey: "watching",   defaultTitle: "Watching",   mediaType: 'kino' },   // Смотрю
  { i18nTitleKey: "planned",    defaultTitle: "Planned",    mediaType: 'kino' },   // Буду смотреть
  { i18nTitleKey: "completed",  defaultTitle: "Completed",  mediaType: 'kino' },   // Просмотрел
  { i18nTitleKey: "dropped",    defaultTitle: "Dropped",    mediaType: 'kino' },   // Бросил

  // 📚 Книги
  { i18nTitleKey: "reading",    defaultTitle: "Reading",    mediaType: 'book' },   // Читаю
  { i18nTitleKey: "planned",    defaultTitle: "Planned",    mediaType: 'book' },   // Планирую прочитать
  { i18nTitleKey: "completed",  defaultTitle: "Completed",  mediaType: 'book' },   // Прочитано
  { i18nTitleKey: "dropped",    defaultTitle: "Dropped",    mediaType: 'book' },   // Брошено

  // 🎵 Музыка
  { i18nTitleKey: "listening",  defaultTitle: "Listening",  mediaType: 'music' },  // Слушаю
  { i18nTitleKey: "planned",    defaultTitle: "Planned",    mediaType: 'music' },  // Хочу послушать
  { i18nTitleKey: "completed",  defaultTitle: "Completed",  mediaType: 'music' },  // Прослушано
  { i18nTitleKey: "skipped",    defaultTitle: "Skipped",    mediaType: 'music' },  // Пропустил / Не зашло

  // 📖 Комиксы
  { i18nTitleKey: "reading",    defaultTitle: "Reading",    mediaType: 'comic' },  // Читаю
  { i18nTitleKey: "planned",    defaultTitle: "Planned",    mediaType: 'comic' },  // Планирую читать
  { i18nTitleKey: "completed",  defaultTitle: "Completed",  mediaType: 'comic' },  // Прочитано
  { i18nTitleKey: "dropped",    defaultTitle: "Dropped",    mediaType: 'comic' },  // Брошено
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