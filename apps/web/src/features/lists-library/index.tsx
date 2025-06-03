'use server'

import { getCurrentUser } from '@/src/shared/lib/dal'
import type { MediaType } from 'database/schemas/media_types'
import { forbidden } from 'next/navigation'
import { getUserLists } from '../settings/services/getUserLists'
import { ListLibrary } from './list-library'

type Props = {
  mediaType: MediaType
}

export async function ListLibraryView({ mediaType }: Props) {
  const user = await getCurrentUser()

  console.log(user)

  if (!user) forbidden()

  const lists = await getUserLists(user.id, mediaType)
  return <ListLibrary lists={lists} mediaType={mediaType} />
}
