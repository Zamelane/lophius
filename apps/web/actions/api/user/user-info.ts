import type { UserInfo } from '@/interfaces'
import { getUserById, getUserByNickname } from '@/lib/dal'
import { cache } from 'react'

export async function MakeUserInfoById(
  userId: number,
  userIdForCheckIsMe?: number
): Promise<undefined | UserInfo> {
  const user = await getUserById(userId)

  if (!user) return

  if (user.id === userIdForCheckIsMe) return user

  return {
    ...user,
    email: undefined,
    password: undefined
  }
}

export const CachedMakeUserInfoById = cache(MakeUserInfoById)

export async function MakeUserInfoByNickname(
  nickname: string,
  userIdForCheckIsMe?: number
): Promise<undefined | UserInfo> {
  const user = await getUserByNickname(nickname)

  if (!user) return

  if (user.id === userIdForCheckIsMe) return user

  return {
    ...user,
    email: undefined,
    password: undefined
  }
}

export const CachedMakeUserInfoByNickname = cache(MakeUserInfoByNickname)
