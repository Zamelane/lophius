import { LayoutProps } from "@/src/shared/types";
import { MediaType, mediaTypes } from "database/schemas/media_types";
import { forbidden } from "next/navigation";

type Props = LayoutProps & {
  params: Promise<{ mediaType: MediaType }>
}

export default async function Layout({ children, params }: Props) {
  const mediaType = (await params).mediaType

  if (!mediaTypes.includes(mediaType))
    forbidden()

  return children
}