'use server'

import { getCurrentLocale } from "@/src/shared/i18n/current-locale"
import { getCurrentUser } from "@/src/shared/lib/dal"
import { and, db, eq, sql } from "database"
import { medias } from "database/schemas"
import { userListMedias } from "database/schemas/lists"
import { MediaType } from "database/schemas/media_types"
import { literalPosters, literalTranslate } from "../../lists-library/services/literals"
import { VideoMediaCardProps } from "../ui/media-card"

type Props = {
  mediaType: MediaType
}

export async function getUserLastUpdates({ mediaType }: Props) {
  const user = await getCurrentUser()

  if (!user) {
    return
  }

  const locale = await getCurrentLocale()

  const result = await db
    .select()
    .from(medias)
    .innerJoin(
      userListMedias,
      and(
        eq(userListMedias.mediaId, medias.id),
        eq(userListMedias.userId, user.id)
      )
    )
    .where(eq(medias.mediaType, mediaType))
    .leftJoinLateral(literalTranslate(locale), sql`true`)
    .leftJoinLateral(literalPosters(locale), sql`true`)
    .limit(15)

  const rtr: VideoMediaCardProps[] = []

  for (const row of result) {
    if (row.medias.mediaType === 'video') {
      rtr.push({
        id: row.medias.id,
        title: row.literal_translate?.title || 'Нету заголовка',
        img: row.literal_posters || undefined,
        prefix: row.user_list_medias.date?.toISOString().split('T')[0]
      })
    }
  }

  return rtr
}