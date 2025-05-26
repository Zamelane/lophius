import { ListLibraryView } from "@/src/features/lists-library"
import { MediaType } from "database/schemas/media_types"

type Props = {
  params: Promise<{ mediaType: MediaType }>
}

export default async function ListsPage({ params }: Props) {
  const mediaType = (await params).mediaType
  return (
    <ListLibraryView mediaType={mediaType} />
  )
}