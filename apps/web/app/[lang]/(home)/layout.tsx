import { SWRProvider } from '@/components/helps/SWRProvider'
import AppLayout from '@/components/layouts/AppLayout'
import type { LayoutProps } from '@/interfaces'

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
