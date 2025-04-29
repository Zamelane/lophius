'use client'

import { ClearCookies } from '@/actions/server/clear-cookies'
import { clearAuth } from '@/components/helps/auth-context'

export async function UserLogout() {
  await ClearCookies()
  clearAuth()
}
