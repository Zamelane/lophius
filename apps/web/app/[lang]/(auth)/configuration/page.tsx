'use server'

import { getIsConfigured } from '@/lib/config'
import { ConfigurationView } from '@/views/configuration/view'
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
