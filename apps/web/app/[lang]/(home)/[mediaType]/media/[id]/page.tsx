import { getTvDetailedInfo } from '@/src/features/media/pages/get-tv-detailed-info'
import { ContentLayout } from '@/src/shared/ui/layout/content-layout'
import { DesktopSidebar } from '@/src/shared/ui/media/page-components/desktop-sidebar'
import { MobileActions } from '@/src/shared/ui/media/page-components/mobile-actions'
import { MobilePoster } from '@/src/shared/ui/media/page-components/mobile-poster'
import { MobileBackdrop } from '@/src/shared/ui/media/page-components/mobileBackdrop'
import { TitleSection } from '@/src/shared/ui/media/page-components/title-section'
import { ParseStatusCard } from '@/src/widgets/auto-parse/statusCard'
import { FilmInfo } from '@/src/widgets/media/page-info/film-info'
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

  const mediaInfo = await getTvDetailedInfo({ id })

  if (!mediaInfo) {
    notFound()
  }

  return (
    <ContentLayout className='px-0'>
      <ParseStatusCard />
      <MobileBackdrop backdrops={[...mediaInfo.backdrops, ...mediaInfo.posters]} />

      <div className='flex py-4 gap-4 px-[16px] md:px-[0]'>
        <DesktopSidebar mediaInfo={mediaInfo} id={id} />

        <div className='flex flex-col gap-4 flex-grow min-w-0 max-w-full'>
          <MobilePoster posters={mediaInfo.posters} />
          <TitleSection mediaInfo={mediaInfo} />
          <MobileActions id={id} />
          <div className='flex flex-grow flex-col max-w-full'>
            <FilmInfo mediaInfo={mediaInfo} />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
