'use server'

import { MediaType } from "database/schemas/media_types";
import { ListLibrary } from "./list-library";
import { getUserLists } from "../settings/services/getUserLists";
import { getCurrentUser } from "@/src/shared/lib/dal";
import { forbidden } from "next/navigation";

type Props = {
  mediaType: MediaType
}

export async function ListLibraryView({
  mediaType
}: Props) {
  const user = await getCurrentUser()

  console.log(user)
  
  if (!user)
    forbidden()

  const lists = await getUserLists(user.id, mediaType)
  return (
    <ListLibrary lists={lists} mediaType={mediaType} />
  )
}