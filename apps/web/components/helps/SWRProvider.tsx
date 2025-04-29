'use client'

import type { LayoutProps } from '@/interfaces'
import { SWRConfig } from 'swr'

export const SWRProvider = ({ children }: LayoutProps) => {
  return <SWRConfig>{children}</SWRConfig>
}
