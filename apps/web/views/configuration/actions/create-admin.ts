'use server'

import CreateUser from '@/actions/server/logics/create-user'
import type { ApiResponse } from '@/interfaces'

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
