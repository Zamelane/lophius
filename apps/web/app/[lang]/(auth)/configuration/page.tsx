'use server'

import { ConfigurationView } from '@/src/processes/configuration/view'
import { getIsConfigured } from '@/src/shared/lib/config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Первоначальная настройка'
  }
}

export default async function ServerConfigPage() {
  const isConfigured = getIsConfigured()
  if (isConfigured) {
    return redirect('/')
  }
  return <ConfigurationView />
}
