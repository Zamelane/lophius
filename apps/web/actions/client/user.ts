'use client'

import { ClearCookies } from '@/actions/server/clear-cookies'
import { clearAuth } from '@/src/shared/providers/auth-context'

export async function UserLogout() {
  await ClearCookies()
  clearAuth()
}
