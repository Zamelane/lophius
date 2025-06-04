import { LastUserActivity } from '@/src/features/main-blocks/ui/lastUserActivitySection'
import { TopChipsSection } from '@/src/features/main-blocks/ui/topChipsSection'
import { ContentLayout } from '@/src/shared/ui/layout/content-layout'
import { MediaType } from 'database/schemas/media_types'

export default async function Page({
  params
}: {
  params: Promise<{ mediaType: MediaType }>
}) {
  const { mediaType } = await params
  return (
    <ContentLayout className='px-4'>
      <TopChipsSection/>
      <LastUserActivity mediaType={mediaType}/>
    </ContentLayout>
  )
}
