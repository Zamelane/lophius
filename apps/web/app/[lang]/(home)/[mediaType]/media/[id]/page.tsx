import { MediaListButton } from '@/src/features/media-list-button'
import { getMediaInfo } from '@/src/features/media/services/getMediaInfo'
import { MediaPageView } from '@/src/widgets/media/page-info/view'
import { db, eq } from 'database'
import { medias } from 'database/schemas'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = {
  params: Promise<{ id: number }>
}

export default async function TVDetailedPage({ params }: Props) {
  const id = (await params).id

  if (!id) {
    notFound()
  }

  const [check] = await db.select()
    .from(medias)
    .where(eq(medias.id, id))
    .limit(1)

  if (!check) {
    notFound()
  }

  const mediaInfo = await getMediaInfo({ id })

  const mediaListButton = (<MediaListButton mediaId={id}/>)

  return (
    <MediaPageView mediaInfo={mediaInfo} mediaListButton={mediaListButton} />
  )
}