'use server'

import { MediaInfoType } from "@/src/shared/types/web-types"
import { db, eq } from "database"
import { medias } from "database/schemas"

type Props = {
  id: number
}

export async function getMediaInfo({ id }: Props) {
  const [check] = await db.select()
    .from(medias)
    .where(eq(medias.id, id))
    .limit(1)

  const mediaInfo: MediaInfoType = {
    meta: {},
    source: {
      title: 'TMDB',
      externalMediaId: '123'
    },
    _raw: {
      media: check
    }
  }

  return mediaInfo
}