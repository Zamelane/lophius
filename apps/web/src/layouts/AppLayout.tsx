'use server'

import { getCurrentLocale } from '../shared/i18n/current-locale'
import type { LayoutProps } from '@/src/shared/types'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import { SiteHeader } from '../shared/ui/navigation/site-header'
import { SidebarInset, SidebarProvider } from '../shared/ui/shadcn/sidebar'
import { AppSidebar } from '../shared/ui/layout/app-sidebar'
import { Footer } from '../shared/ui/layout/footer'

const GlobalSearch = dynamic(() =>
  import('../widgets/global-search').then((gs) => gs.GlobalSearch)
)

const GlobalSearchProvider = dynamic(() =>
  import('../widgets/global-search').then(
    (gs) => gs.GlobalSearchProvider
  )
)

export default async function AppLayout({ children }: LayoutProps) {
  const state = cookies().then((r) => {
    const loadedState = r.get('sidebar_state')
    return loadedState ? loadedState.value === 'true' : false
  })
  const lang = await getCurrentLocale()

  return (
    <GlobalSearchProvider>
      <SidebarProvider defaultOpen={state}>
        <GlobalSearch />
        <AppSidebar />
        <SidebarInset className='ml-[2px] overflow-hidden'>
          <SiteHeader />
          <div className='flex flex-grow justify-center'>
            <div className='w-full max-w-[1920px]'>
              <Suspense fallback={<p>Загрузка ...</p>}>{children}</Suspense>
            </div>
          </div>
          <Footer lang={lang} />
        </SidebarInset>
      </SidebarProvider>
    </GlobalSearchProvider>
  )
}
