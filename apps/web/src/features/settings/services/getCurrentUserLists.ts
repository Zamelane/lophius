'use server'

import { getCurrentUser } from "@/src/shared/lib/dal";
import { MediaType } from "database/schemas/media_types";
import { getUserLists } from "./getUserLists";

export async function getCurrentUserLists(mediaType: MediaType) {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  return await getUserLists(user.id, mediaType)
}