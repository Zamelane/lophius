import { LocaleLink } from '@/src/shared/hooks/locale-link'
import type { LayoutProps } from '@/src/shared/types'
import { ContentLayout } from '@/src/shared/ui/layout/content-layout'
import { HeaderTitle } from '@/src/shared/ui/navigation/header-title'
import { Button } from '@/src/shared/ui/shadcn/button'
import type { MediaType } from 'database/schemas/media_types'
import { SettingsIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { use } from 'react'

type Props = LayoutProps & {
  params: Promise<{ mediaType: MediaType }>
}

export default function Layout({ children, params }: Props) {
  const t = useTranslations('MediaTypes')
  const { mediaType } = use(params)
  return (
    <ContentLayout className='px-4'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <HeaderTitle className='text-2xl'>Календарь</HeaderTitle>
          {/* <h1 className="text-2xl">Библиотека</h1> */}
          <p className='text-sm opacity-80'>
            Твой календарь выхода {t(`${mediaType}Plural`).toLowerCase()}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <LocaleLink href='/settings?tab=lists'>
            <Button size='icon' variant='ghost'>
              <SettingsIcon />
            </Button>
          </LocaleLink>
        </div>
      </div>
      {children}
    </ContentLayout>
  )
}
