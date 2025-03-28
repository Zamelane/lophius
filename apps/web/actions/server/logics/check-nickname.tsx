'use server'

import { api_t_keys } from "@/i18n"
import { ApiResponse } from "@/interfaces"
import { CheckNicknameExists } from "@/validates"

export async function ChickNickname(nickname: string, currentNickname: string): Promise<ApiResponse<boolean>> {
  try {
    return {
      success: true,
      data: (await CheckNicknameExists(nickname) || nickname === currentNickname) && nickname.length <= 15 && nickname.length >= 2
    }
  } catch {
    return {
      success: false,
      error: {
        message: 'Error',
        i18n: api_t_keys.error
      }
    }
  }
}