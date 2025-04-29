'use client'

import { useAuth } from '@/components/helps/auth-context'
import type { ClientResponse, CurrentUserInfo } from '@/interfaces'
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export function AuthFromSWR() {
  const { data } = useSWR<ClientResponse<CurrentUserInfo>>(
    '/api/users/me',
    fetcher,
    {
      fallbackData: useAuth(),
      revalidateOnMount: false
    }
  )

  return data?.content
}
