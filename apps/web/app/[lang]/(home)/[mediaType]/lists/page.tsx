import { ListLibraryView } from "@/src/features/lists-library"
import { MediaType } from "database/schemas/media_types"
import { forbidden } from "next/navigation"

type Props = {
  params: Promise<{ mediaType?: MediaType }>
}

export default async function ListsPage({ params }: Props) {
  const mediaType = (await params).mediaType

  if (!mediaType)
    forbidden()

  return (
    <ListLibraryView mediaType={mediaType} />
  )
}