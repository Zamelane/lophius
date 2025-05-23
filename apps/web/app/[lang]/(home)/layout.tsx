import { SWRProvider } from '@/src/shared/providers/SWRProvider'
import AppLayout from '@/src/layouts/AppLayout'
import type { LayoutProps } from '@/src/shared/types'
import React from 'react'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {
        // Метрика
        process.env.METRICS !== undefined && process.env.METRICS.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: process.env.METRICS }} />
        )
      }
      <SWRProvider>
        <AppLayout>{children}</AppLayout>
      </SWRProvider>
    </>
  )
}
