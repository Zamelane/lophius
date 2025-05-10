import { ContentLayout } from '@/components/template-components/other/content-layout'

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
