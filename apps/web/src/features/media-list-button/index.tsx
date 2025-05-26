'use server'

import { getCurrentUser } from "@/src/shared/lib/dal";
import { getUserLists } from "../settings/services/getUserLists";
import { ButtonList } from "./button";
import { getMediaType } from "../media/services/getMediaType";
import { getMediaItemList } from "./services/getMediaItemList";

export async function MediaListButton({ mediaId }: { mediaId: number }) {
  const user = await getCurrentUser()
  const mediaType = await getMediaType(mediaId)

  if (!user || !mediaType)
    return null

  const lists = await getUserLists(user.id, mediaType)
  const inLists = await getMediaItemList(mediaId, user.id) ?? []

  return <ButtonList lists={lists} inLists={inLists} userId={user.id} mediaId={mediaId}/>
}