'use client'

import { useAuth } from '@/src/shared/providers/auth-context'
import type { ClientResponse, CurrentUserInfo } from '@/src/shared/types';
import { fetcher } from '@/src/shared/lib/fetcher'
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
