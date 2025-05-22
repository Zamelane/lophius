'use client'

import type { LayoutProps } from '@/src/shared/types'
import { SWRConfig } from 'swr'

export const SWRProvider = ({ children }: LayoutProps) => {
  return <SWRConfig>{children}</SWRConfig>
}
