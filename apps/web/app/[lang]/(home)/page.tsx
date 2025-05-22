import { ContentLayout } from '@/src/shared/ui/layout/content-layout'
import type { MetadataProps } from '@/src/shared/types'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(props: MetadataProps) {
  const t = await getTranslations({
    namespace: 'HomePage',
    locale: (await props.params).locale
  })

  return {
    title: t('title')
  }
}

export default async function HomePage() {
  return (
    <ContentLayout className='px-4'>
      <div>Home page</div>
    </ContentLayout>
  )
}
