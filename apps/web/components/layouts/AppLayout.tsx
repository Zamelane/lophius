'use server'

import { getCurrentLocale } from '@/i18n/current-locale'
import type { LayoutProps } from '@/interfaces'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import { SiteHeader } from '../sidebar/site-header'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { Footer } from './Footer'
import { AppSidebar } from '../sidebar/app-sidebar'

const GlobalSearch = dynamic(() =>
  import('../template-components/global-search').then((gs) => gs.GlobalSearch)
)

const GlobalSearchProvider = dynamic(() =>
  import('../template-components/global-search').then(
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
