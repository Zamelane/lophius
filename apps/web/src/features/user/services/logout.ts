'use client'

import { ClearCookies } from '@/src/features/auth/services/clear-cookies'
import { clearAuth } from '@/src/shared/providers/auth-context'

export async function UserLogout() {
  await ClearCookies()
  clearAuth()
}
