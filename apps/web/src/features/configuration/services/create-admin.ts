'use server'

import CreateUser from '@/src/features/auth/services/create-user'
import type { ApiResponse } from '@/src/shared/types'

type Props = {
  nickname: string
  email: string
  password: string
}

export async function CreateAdmin(
  props: Props
): Promise<ApiResponse<undefined>> {
  try {
    CreateUser({
      ...props,
      isAdmin: true
    })
    return {
      success: true,
      data: undefined
    }
  } catch (err) {
    return {
      success: false,
      error: {
        i18n: '',
        message: err instanceof Error ? err.message : `${err}`
      }
    }
  }
}
