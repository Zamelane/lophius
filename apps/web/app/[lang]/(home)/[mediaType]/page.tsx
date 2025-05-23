import { ContentLayout } from '@/src/shared/ui/layout/content-layout'

export default async function Page({
  params
}: {
  params: Promise<{ mediaType: string }>
}) {
  const { mediaType } = await params
  return (
    <ContentLayout className='px-4'>
      <p>{mediaType}</p>
    </ContentLayout>
  )
}
