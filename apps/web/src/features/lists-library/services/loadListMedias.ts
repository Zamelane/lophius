'use server'

import { MediaType } from "database/schemas/media_types"
import { Props as GridMediaCardProps } from "../../media/ui/gridMediaCard"
import { and, db, eq, sql } from "database"
import { medias } from "database/schemas"
import { userListMedias } from "database/schemas/lists"
import { getCurrentUser } from "@/src/shared/lib/dal"
import { forbidden } from "next/navigation"
import { literalPosters, literalTranslate } from "./literals"
import { getCurrentLocale } from "@/src/shared/i18n/current-locale"

const count = 25

type Props = {
  mediaType: MediaType,
  listId: number,
  afterMediaId?: number
}

export async function loadListMedias({
  listId,
  mediaType,
  afterMediaId
}: Props): Promise<GridMediaCardProps[]> {
  const user = await getCurrentUser()

  if (!user)
    forbidden()

  const locale = await getCurrentLocale()

  const result = await db.select()
    .from(medias)
    .innerJoin(userListMedias, and(
      eq(userListMedias.mediaId, medias.id),
      eq(userListMedias.listId, listId),
      eq(userListMedias.userId, user.id)
    ))
    .where(eq(medias.mediaType, mediaType))
    .leftJoinLateral(literalTranslate(locale), sql`true`)
    .leftJoinLateral(literalPosters(locale), sql`true`)
  
  const rtr: GridMediaCardProps[] = []

  for (const row of result) {
    if (row.medias.mediaType === 'kino') {
      rtr.push({
        id: row.medias.id,
        img: row.literal_posters,
        mediaType: row.medias.mediaType,
        title: row.literal_translate?.title,
        subText: '123'
      })
    }
  }

  return rtr
}